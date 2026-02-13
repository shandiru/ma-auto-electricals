import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InvoiceGenerator = () => {
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [taxPercent, setTaxPercent] = useState(0);
  const [items, setItems] = useState([{ description: '', price: 0, count: 1 }]);

  const companyName = "Ma auto Electricals"; 

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

  const downloadPDF = async () => {
    const element = document.getElementById('invoice-card');
    const noPdfElements = document.querySelectorAll('.no-pdf');

    noPdfElements.forEach(el => el.style.visibility = 'hidden');

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${companyName}_${customerName || 'Invoice'}.pdf`);
    } catch (error) {
      console.error("PDF Error:", error);
    } finally {
      noPdfElements.forEach(el => el.style.visibility = 'visible');
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#f3f4f6', 
      minHeight: '100vh', 
      padding: '16px',
    }}>
      <style>
        {`
          @media (min-width: 768px) {
            .invoice-container {
              padding: 48px 16px !important;
            }
            .invoice-card {
              padding: 40px !important;
            }
          }
          
          @media (max-width: 767px) {
            .invoice-header {
              flex-direction: column !important;
              gap: 24px !important;
            }
            .invoice-header-right {
              text-align: left !important;
            }
            .invoice-header-right h2 {
              font-size: 36px !important;
            }
            .logo-container {
              flex-direction: column !important;
              align-items: flex-start !important;
            }
            .company-title {
              font-size: 20px !important;
            }
            .invoice-table-wrapper {
              overflow-x: auto !important;
            }
            .totals-section {
              width: 100% !important;
            }
          }
          
          input:focus {
            outline: none !important;
          }
        `}
      </style>
      
      <div 
        id="invoice-card" 
        className="invoice-card"
        style={{
          maxWidth: '896px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          borderRadius: '2px',
          padding: '24px',
          borderTop: '10px solid #317F21'
        }}
      >
        {/* Header */}
        <div 
          className="invoice-header"
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            marginBottom: '48px' 
          }}
        >
          <div>
            <div 
              className="logo-container"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px', 
                marginBottom: '16px' 
              }}
            >
              <img 
                src="log.png" 
                alt="Logo" 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  objectFit: 'contain',
                  borderRadius: '4px'
                }}
              />
              <h1 
                className="company-title"
                style={{ 
                  fontSize: '30px', 
                  fontWeight: '900', 
                  letterSpacing: '-0.025em', 
                  color: '#000000', 
                  textTransform: 'uppercase',
                  margin: 0
                }}
              >
                {companyName}
              </h1>
            </div>
            <div style={{ color: '#6b7280', fontSize: '14px', fontStyle: 'italic' }}>
              Premium Service & Quality
            </div>
          </div>
          
          <div className="invoice-header-right" style={{ textAlign: 'right' }}>
            <h2 style={{ 
              color: '#e5e7eb', 
              fontSize: '60px', 
              fontWeight: '900', 
              textTransform: 'uppercase',
              margin: 0,
              lineHeight: 1
            }}>
              Invoice
            </h2>
            <input 
              style={{ 
                textAlign: 'right', 
                outline: 'none', 
                borderBottom: '1px solid #f3f4f6',
                marginTop: '8px',
                padding: '4px',
                border: 'none',
                borderBottom: '1px solid #f3f4f6',
                width: '100%',
                maxWidth: '150px'
              }}
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              onFocus={(e) => e.target.style.borderBottom = '1px solid #317F21'}
              onBlur={(e) => e.target.style.borderBottom = '1px solid #f3f4f6'}
            />
          </div>
        </div>

        {/* Customer Detail */}
        <div style={{ 
          marginBottom: '48px', 
          borderLeft: '4px solid #000000', 
          paddingLeft: '24px' 
        }}>
          <label style={{ 
            color: '#317F21', 
            display: 'block', 
            fontSize: '10px', 
            fontWeight: '900', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em', 
            marginBottom: '4px' 
          }}>
            Customer
          </label>
          <input 
            placeholder="Name here..."
            style={{ 
              width: '100%', 
              fontSize: '24px', 
              fontWeight: '700', 
              outline: 'none', 
              textTransform: 'uppercase',
              border: 'none'
            }}
            type="text" 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)} 
          />
        </div>

        {/* Table Section */}
        <div style={{ marginBottom: '40px' }}>
          <div className="invoice-table-wrapper" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
              <thead>
                <tr style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '11px', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em' 
                  }}>
                    Description
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'center', 
                    fontSize: '11px', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em' 
                  }}>
                    Price
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'center', 
                    fontSize: '11px', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em' 
                  }}>
                    Qty
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'right', 
                    fontSize: '11px', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em' 
                  }}>
                    Total
                  </th>
                  <th className="no-pdf" style={{ padding: '16px', width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '16px' }}>
                      <input 
                        style={{ 
                          width: '100%', 
                          outline: 'none', 
                          fontWeight: '600', 
                          color: '#374151', 
                          border: 'none',
                          minWidth: '150px'
                        }}
                        placeholder="Item name..."
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      />
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <input 
                        style={{ 
                          width: '80px', 
                          textAlign: 'center', 
                          outline: 'none', 
                          border: 'none' 
                        }}
                        type="number"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <input 
                        style={{ 
                          width: '48px', 
                          textAlign: 'center', 
                          outline: 'none', 
                          border: 'none' 
                        }}
                        type="number"
                        value={item.count}
                        onChange={(e) => handleItemChange(index, 'count', parseInt(e.target.value) || 1)}
                      />
                    </td>
                    <td style={{ 
                      padding: '16px', 
                      textAlign: 'right', 
                      fontWeight: '700', 
                      color: '#1f2937' 
                    }}>
                      ${(item.price * item.count).toFixed(2)}
                    </td>
                    <td className="no-pdf" style={{ padding: '16px', textAlign: 'center' }}>
                      <button 
                        onClick={() => removeItem(index)} 
                        style={{ 
                          color: '#d1d5db', 
                          background: 'none', 
                          border: 'none', 
                          cursor: 'pointer', 
                          fontSize: '18px' 
                        }}
                        onMouseOver={(e) => e.target.style.color = '#ef4444'}
                        onMouseOut={(e) => e.target.style.color = '#d1d5db'}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button 
            onClick={addItem}
            className="no-pdf"
            style={{
              marginTop: '16px',
              fontSize: '10px',
              fontWeight: '700',
              color: '#317F21',
              textTransform: 'uppercase',
              border: '1px solid #317F21',
              padding: '8px 16px',
              borderRadius: '4px',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            + Add Row
          </button>
        </div>

        {/* Totals */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '48px' }}>
          <div className="totals-section" style={{ width: '288px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              color: '#6b7280', 
              fontSize: '14px', 
              marginBottom: '12px' 
            }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: '700', color: '#000000' }}>
                ${subTotal.toFixed(2)}
              </span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              color: '#6b7280', 
              fontSize: '14px', 
              marginBottom: '12px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Tax (%)</span>
                <input 
                  type="number" 
                  style={{ 
                    width: '48px', 
                    textAlign: 'center', 
                    outline: 'none',
                    border: 'none',
                    borderBottom: '1px solid #d1d5db'
                  }}
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(parseFloat(e.target.value) || 0)}
                  onFocus={(e) => e.target.style.borderBottom = '1px solid #317F21'}
                  onBlur={(e) => e.target.style.borderBottom = '1px solid #d1d5db'}
                />
              </div>
              <span style={{ fontWeight: '700', color: '#000000' }}>
                ${taxAmount.toFixed(2)}
              </span>
            </div>
            
            <div style={{ 
              backgroundColor: '#000000', 
              padding: '16px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              borderRadius: '2px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <span style={{ 
                color: '#ffffff', 
                fontSize: '10px', 
                fontWeight: '700', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em' 
              }}>
                Total Bill
              </span>
              <span style={{ 
                color: '#317F21', 
                fontSize: '24px', 
                fontWeight: '900' 
              }}>
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Download Button Area */}
        <div className="no-pdf" style={{ 
          marginTop: '64px', 
          display: 'flex', 
          justifyContent: 'center' 
        }}>
          <button 
            onClick={downloadPDF}
            style={{
              backgroundColor: '#317F21',
              color: '#ffffff',
              padding: '16px 48px',
              borderRadius: '9999px',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.9'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;