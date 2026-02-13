import React, { useState } from 'react';
import jsPDF from 'jspdf';

const InvoiceGenerator = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState('');
  const [taxPercent, setTaxPercent] = useState(0);
  const [items, setItems] = useState([{ description: '', price: 0, count: 1 }]);

  // Get values from .env
  const companyName = import.meta.env.VITE_COMPANY_NAME;
  const companyAddress = import.meta.env.VITE_COMPANY_ADDRESS;
  const companyCity = import.meta.env.VITE_COMPANY_CITY;
  const companyPhone = import.meta.env.VITE_COMPANY_PHONE;
  const companyEmail = import.meta.env.VITE_COMPANY_EMAIL;
  
  const primaryColor = import.meta.env.VITE_PRIMARY_COLOR;
  const secondaryColor = import.meta.env.VITE_SECONDARY_COLOR;
  const accentColor = import.meta.env.VITE_ACCENT_COLOR;
  const borderColor = import.meta.env.VITE_BORDER_COLOR;

  const addItem = () => {
    setItems([...items, { description: '', price: 0, count: 1 }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const subTotal = items.reduce((acc, item) => acc + (item.price * item.count), 0);
  const taxAmount = (subTotal * taxPercent) / 100;
  const total = subTotal + taxAmount;

  // Helper to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const downloadPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPos = 20;

    const primaryRgb = hexToRgb(primaryColor);
    const secondaryRgb = hexToRgb(secondaryColor);

    // Helper function for text
    const addText = (text, x, y, options = {}) => {
      pdf.setFontSize(options.size || 10);
      pdf.setFont(options.font || 'helvetica', options.style || 'normal');
      
      if (options.color === 'primary') {
        pdf.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
      } else if (options.color === 'secondary') {
        pdf.setTextColor(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b);
      } else if (options.color) {
        pdf.setTextColor(options.color);
      } else {
        pdf.setTextColor('#000000');
      }
      
      pdf.text(text, x, y, options.align ? { align: options.align } : undefined);
    };

    // Helper for lines
    const addLine = (x1, y1, x2, y2, width = 0.5, color = 'secondary') => {
      pdf.setLineWidth(width);
      if (color === 'primary') {
        pdf.setDrawColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
      } else {
        pdf.setDrawColor(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b);
      }
      pdf.line(x1, y1, x2, y2);
    };

    // Top brand accent line
    pdf.setFillColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    pdf.rect(0, 0, pageWidth, 5, 'F');

    yPos = 20;

    // Header - Company Name
    addText(companyName, 20, yPos, { size: 18, style: 'bold', color: 'secondary' });
    addText('INVOICE', pageWidth - 20, yPos, { size: 24, style: 'bold', color: 'primary', align: 'right' });
    
    yPos += 8;
    pdf.setFontSize(9);
    pdf.setTextColor('#666666');
    pdf.text(companyAddress, 20, yPos);
    
    yPos += 5;
    pdf.text(companyCity, 20, yPos);
    
    yPos += 5;
    pdf.text(companyPhone, 20, yPos);
    
    if (companyEmail) {
      yPos += 5;
      pdf.text(companyEmail, 20, yPos);
    }

    // Invoice details (right side)
    const rightX = pageWidth - 20;
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor('#000000');
    pdf.text(`Invoice #: ${invoiceNumber || 'N/A'}`, rightX, yPos - 10, { align: 'right' });
    pdf.text(`Date: ${date || 'N/A'}`, rightX, yPos - 5, { align: 'right' });

    yPos += 10;
    
    // Separator line with brand color
    addLine(20, yPos, pageWidth - 20, yPos, 1.5, 'primary');
    
    yPos += 10;

    // Bill To section
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    pdf.text('BILL TO:', 20, yPos);
    
    yPos += 7;
    
    // Bill To box with brand accent
    pdf.setFillColor(250, 250, 250);
    pdf.rect(20, yPos - 5, pageWidth - 40, 25, 'F');
    pdf.setDrawColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    pdf.setLineWidth(0.5);
    pdf.rect(20, yPos - 5, pageWidth - 40, 25);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor('#1a1a1a');
    pdf.text(customerName || 'Customer Name', 25, yPos);
    
    yPos += 6;
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor('#666666');
    pdf.text(customerAddress || 'Address', 25, yPos);
    
    yPos += 5;
    pdf.text(customerPhone || 'Phone Number', 25, yPos);
    
    yPos += 15;

    // Table Header
    const tableStartY = yPos;
    const colDesc = 20;
    const colPrice = 110;
    const colQty = 145;
    const colAmount = 165;
    
    // Header background with brand color
    pdf.setFillColor(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b);
    pdf.rect(colDesc, tableStartY, pageWidth - 40, 10, 'F');
    
    // Header text
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text('DESCRIPTION', colDesc + 2, tableStartY + 6);
    pdf.text('UNIT PRICE', colPrice + 2, tableStartY + 6);
    pdf.text('QTY', colQty + 2, tableStartY + 6);
    pdf.text('AMOUNT', colAmount + 2, tableStartY + 6);
    
    yPos = tableStartY + 10;

    // Table rows
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor('#333333');
    
    items.forEach((item, index) => {
      yPos += 8;
      
      // Zebra striping
      if (index % 2 === 1) {
        pdf.setFillColor(250, 250, 250);
        pdf.rect(colDesc, yPos - 6, pageWidth - 40, 8, 'F');
      }
      
      pdf.setFontSize(9);
      pdf.text(item.description || '---', colDesc + 2, yPos);
      pdf.text(`£${item.price.toFixed(2)}`, colPrice + 2, yPos);
      pdf.text(item.count.toString(), colQty + 2, yPos);
      
      pdf.setFont('helvetica', 'bold');
      pdf.text(`£${(item.price * item.count).toFixed(2)}`, colAmount + 2, yPos);
      pdf.setFont('helvetica', 'normal');
    });
    
    yPos += 10;
    
    // Bottom border of table
    pdf.setDrawColor(224, 224, 224);
    pdf.line(colDesc, yPos, pageWidth - 20, yPos);

    yPos += 15;

    // Totals section
    const totalsX = pageWidth - 75;
    
    pdf.setFontSize(10);
    pdf.setTextColor('#666666');
    pdf.text('Subtotal:', totalsX, yPos);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor('#000000');
    pdf.text(`£${subTotal.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });
    
    yPos += 7;
    
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor('#666666');
    pdf.text(`Tax (${taxPercent}%):`, totalsX, yPos);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor('#000000');
    pdf.text(`£${taxAmount.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });
    
    yPos += 10;
    
    // Total box with brand color
    pdf.setFillColor(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b);
    pdf.rect(totalsX - 5, yPos - 6, pageWidth - totalsX - 15, 12, 'F');
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text('TOTAL:', totalsX, yPos);
    pdf.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    pdf.text(`£${total.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });

    yPos += 15;
    
    // Footer with brand accent
    pdf.setDrawColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    pdf.setLineWidth(0.5);
    pdf.line(20, yPos, pageWidth - 20, yPos);
    
    yPos += 8;
    
    pdf.setFontSize(8);
    pdf.setTextColor('#999999');
    pdf.setFont('helvetica', 'normal');
    
    yPos += 5;

    // Bottom brand strip
    yPos = pdf.internal.pageSize.getHeight() - 5;
    pdf.setFillColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    pdf.rect(0, yPos, pageWidth, 5, 'F');

    // Save
    pdf.save(`Invoice_${invoiceNumber || 'Draft'}_${customerName || 'Customer'}.pdf`);
  };

  return (
    <div className="min-h-screen py-4 md:py-6 lg:py-10 px-3 md:px-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div 
        className="max-w-4xl mx-auto bg-white shadow-lg p-4 md:p-8 lg:p-12 xl:p-16 border-t-4 md:border-t-8"
        style={{ 
          borderColor: primaryColor,
          fontFamily: 'Georgia, "Times New Roman", Times, serif'
        }}
      >
        {/* Header */}
        <div className="border-b-2 md:border-b-4 pb-4 md:pb-6 lg:pb-8 mb-6 md:mb-8 lg:mb-10" style={{ borderColor: primaryColor, borderBottomStyle: 'double' }}>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-2">
            <div className="w-full md:w-auto">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 tracking-wide" style={{ color: secondaryColor }}>
                {companyName}
              </h1>
              <div className="text-xs md:text-sm leading-relaxed" style={{ color: accentColor }}>
                {companyAddress}<br/>
                {companyCity}<br/>
                {companyPhone}
                {companyEmail && <><br/>{companyEmail}</>}
              </div>
            </div>
            <div className="w-full md:w-auto md:text-right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 lg:mb-5 tracking-widest" style={{ color: primaryColor }}>
                INVOICE
              </h2>
              <div className="flex flex-col gap-2">
                <div className="text-xs md:text-sm flex items-center md:justify-end gap-2" style={{ color: accentColor }}>
                  <span className="font-bold whitespace-nowrap">Invoice #:</span>
                  <input 
                    className="px-2 py-1 border text-xs md:text-sm flex-1 md:flex-none"
                    style={{ 
                      width: '100%',
                      maxWidth: '120px',
                      borderColor: borderColor,
                      fontFamily: 'Georgia, "Times New Roman", Times, serif'
                    }}
                    type="text" 
                    placeholder="INV-001"
                    value={invoiceNumber} 
                    onChange={(e) => setInvoiceNumber(e.target.value)} 
                  />
                </div>
                <div className="text-xs md:text-sm flex items-center md:justify-end gap-2" style={{ color: accentColor }}>
                  <span className="font-bold whitespace-nowrap">Date:</span>
                  <input 
                    className="px-2 py-1 border text-xs md:text-sm flex-1 md:flex-none"
                    style={{ 
                      width: '100%',
                      maxWidth: '130px',
                      borderColor: borderColor,
                      fontFamily: 'Georgia, "Times New Roman", Times, serif'
                    }}
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-6 md:mb-8 lg:mb-10">
          <div className="text-xs md:text-sm font-bold mb-2 md:mb-3 uppercase tracking-wide" style={{ color: primaryColor }}>
            Bill To:
          </div>
          <div className="p-3 md:p-4 lg:p-5 border" style={{ backgroundColor: '#fafafa', borderColor: primaryColor }}>
            <input 
              placeholder="Customer Name"
              className="w-full text-base md:text-lg font-semibold mb-2 bg-transparent border-none outline-none"
              style={{ 
                color: secondaryColor,
                fontFamily: 'Georgia, "Times New Roman", Times, serif'
              }}
              type="text" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)} 
            />
            <input 
              placeholder="Address"
              className="w-full text-xs md:text-sm mb-1.5 bg-transparent border-none outline-none"
              style={{ 
                color: accentColor,
                fontFamily: 'Georgia, "Times New Roman", Times, serif'
              }}
              type="text" 
              value={customerAddress} 
              onChange={(e) => setCustomerAddress(e.target.value)} 
            />
            <input 
              placeholder="Phone Number"
              className="w-full text-xs md:text-sm bg-transparent border-none outline-none"
              style={{ 
                color: accentColor,
                fontFamily: 'Georgia, "Times New Roman", Times, serif'
              }}
              type="text" 
              value={customerPhone} 
              onChange={(e) => setCustomerPhone(e.target.value)} 
            />
          </div>
        </div>

        {/* Items Table - Desktop/Large Tablet View (1024px+) */}
        <div className="mb-6 md:mb-8 lg:mb-10 hidden lg:block">
          <table className="w-full border-2" style={{ borderColor: secondaryColor, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: secondaryColor }}>
                <th className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-white" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  Description
                </th>
                <th className="px-3 py-3.5 text-center text-xs font-bold uppercase tracking-wide text-white w-24" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  Unit Price
                </th>
                <th className="px-3 py-3.5 text-center text-xs font-bold uppercase tracking-wide text-white w-20" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  Qty
                </th>
                <th className="px-3 py-3.5 text-right text-xs font-bold uppercase tracking-wide text-white w-28" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  Amount
                </th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b" style={{ borderColor: borderColor }}>
                  <td className="px-3 py-3.5">
                    <input 
                      className="w-full outline-none border-none text-sm"
                      style={{ 
                        color: '#333333',
                        fontFamily: 'Georgia, "Times New Roman", Times, serif'
                      }}
                      placeholder="Item or service description"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <span className="text-sm" style={{ color: accentColor }}>£</span>
                    <input 
                      className="w-16 text-right outline-none border-none text-sm"
                      style={{ 
                        color: '#333333',
                        fontFamily: 'Georgia, "Times New Roman", Times, serif'
                      }}
                      type="number"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                    />
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <input 
                      className="w-12 text-center outline-none border-none text-sm"
                      style={{ 
                        color: '#333333',
                        fontFamily: 'Georgia, "Times New Roman", Times, serif'
                      }}
                      type="number"
                      value={item.count}
                      onChange={(e) => handleItemChange(index, 'count', parseInt(e.target.value) || 1)}
                    />
                  </td>
                  <td className="px-3 py-3.5 text-right text-base font-semibold" style={{ 
                    color: secondaryColor,
                    fontFamily: 'Georgia, "Times New Roman", Times, serif'
                  }}>
                    £{(item.price * item.count).toFixed(2)}
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <button 
                      onClick={() => removeItem(index)} 
                      className="text-base px-2 transition-colors"
                      style={{ color: '#999999' }}
                      onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                      onMouseLeave={(e) => e.target.style.color = '#999999'}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button 
            onClick={addItem}
            className="mt-3 px-5 py-2 text-xs font-semibold border transition-colors tracking-wide"
            style={{ 
              color: primaryColor, 
              backgroundColor: '#ffffff',
              borderColor: primaryColor,
              fontFamily: 'Arial, Helvetica, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = primaryColor;
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = primaryColor;
            }}
          >
            + ADD LINE ITEM
          </button>
        </div>

        {/* Items - Mobile & Tablet Card View (<1024px) */}
        <div className="mb-6 md:mb-8 lg:mb-10 block lg:hidden">
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="border-2 p-3 md:p-4 rounded" style={{ borderColor: secondaryColor }}>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold uppercase tracking-wide" style={{ color: primaryColor }}>
                    Item {index + 1}
                  </span>
                  <button 
                    onClick={() => removeItem(index)} 
                    className="text-base px-2 transition-colors"
                    style={{ color: '#999999' }}
                    onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                    onMouseLeave={(e) => e.target.style.color = '#999999'}
                    onTouchStart={(e) => e.target.style.color = '#ef4444'}
                    onTouchEnd={(e) => e.target.style.color = '#999999'}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: accentColor }}>Description</label>
                    <input 
                      className="w-full outline-none border rounded px-3 py-2 text-sm"
                      style={{ 
                        color: '#333333',
                        borderColor: borderColor,
                        fontFamily: 'Georgia, "Times New Roman", Times, serif'
                      }}
                      placeholder="Item or service description"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: accentColor }}>Unit Price</label>
                      <div className="flex items-center border rounded px-2 py-2" style={{ borderColor: borderColor }}>
                        <span className="text-xs mr-1" style={{ color: accentColor }}>£</span>
                        <input 
                          className="w-full outline-none border-none text-sm"
                          style={{ 
                            color: '#333333',
                            fontFamily: 'Georgia, "Times New Roman", Times, serif'
                          }}
                          type="number"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: accentColor }}>Qty</label>
                      <input 
                        className="w-full text-center outline-none border rounded px-2 py-2 text-sm"
                        style={{ 
                          color: '#333333',
                          borderColor: borderColor,
                          fontFamily: 'Georgia, "Times New Roman", Times, serif'
                        }}
                        type="number"
                        value={item.count}
                        onChange={(e) => handleItemChange(index, 'count', parseInt(e.target.value) || 1)}
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: accentColor }}>Amount</label>
                      <div className="text-sm md:text-base font-bold text-right px-2 py-2 border rounded" style={{ 
                        color: secondaryColor,
                        borderColor: borderColor,
                        backgroundColor: '#fafafa',
                        fontFamily: 'Georgia, "Times New Roman", Times, serif'
                      }}>
                        £{(item.price * item.count).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={addItem}
            className="mt-3 w-full px-4 py-2.5 text-xs font-semibold border transition-colors tracking-wide rounded"
            style={{ 
              color: primaryColor, 
              backgroundColor: '#ffffff',
              borderColor: primaryColor,
              fontFamily: 'Arial, Helvetica, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = primaryColor;
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = primaryColor;
            }}
            onTouchStart={(e) => {
              e.target.style.backgroundColor = primaryColor;
              e.target.style.color = '#ffffff';
            }}
            onTouchEnd={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = primaryColor;
            }}
          >
            + ADD LINE ITEM
          </button>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full md:w-80">
            <div className="flex justify-between py-2 md:py-3 border-b text-sm md:text-base" style={{ 
              borderColor: borderColor,
              fontFamily: 'Georgia, "Times New Roman", Times, serif'
            }}>
              <span style={{ color: accentColor }}>Subtotal:</span>
              <span className="font-semibold" style={{ color: secondaryColor }}>£{subTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 md:py-3 border-b text-sm md:text-base" style={{ 
              borderColor: borderColor,
              fontFamily: 'Georgia, "Times New Roman", Times, serif'
            }}>
              <div className="flex items-center gap-2">
                <span style={{ color: accentColor }}>Tax</span>
                <input 
                  type="number" 
                  className="w-12 px-1 py-1 border text-center text-xs md:text-sm rounded"
                  style={{ 
                    borderColor: borderColor,
                    fontFamily: 'Georgia, "Times New Roman", Times, serif'
                  }}
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(parseFloat(e.target.value) || 0)}
                />
                <span style={{ color: accentColor }}>%</span>
              </div>
              <span className="font-semibold" style={{ color: secondaryColor }}>£{taxAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center mt-3 px-3 md:px-4 py-3 md:py-4 rounded" style={{ 
              backgroundColor: secondaryColor,
              fontFamily: 'Georgia, "Times New Roman", Times, serif'
            }}>
              <span className="font-bold text-white text-xs md:text-sm">TOTAL:</span>
              <span className="font-bold text-xl md:text-2xl" style={{ color: primaryColor }}>£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 md:mt-12 lg:mt-16 pt-6 md:pt-8 border-t text-center text-xs" style={{ 
          borderColor: primaryColor, 
          color: '#999999',
          fontFamily: 'Arial, Helvetica, sans-serif'
        }}>
          
         
        </div>

        {/* Download Button */}
        <div className="mt-6 md:mt-8 lg:mt-10 text-center">
          <button 
            onClick={downloadPDF}
            className="w-full md:w-auto px-8 md:px-10 py-3 md:py-3.5 text-xs md:text-sm font-bold tracking-wider shadow-md transition-colors rounded"
            style={{
              backgroundColor: primaryColor,
              color: '#ffffff',
              fontFamily: 'Arial, Helvetica, sans-serif'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
            onTouchStart={(e) => e.target.style.opacity = '0.9'}
            onTouchEnd={(e) => e.target.style.opacity = '1'}
          >
            DOWNLOAD PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;