import { jsPDF } from 'jspdf';
import { AdminTicketRecord } from './ticketStore';

export const generatePDFTicketPass = (ticket: AdminTicketRecord) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [105, 148], // A6 size ticket pass
  });

  // Background Dark Theme
  doc.setFillColor(5, 5, 5);
  doc.rect(0, 0, 105, 148, 'F');

  // Red Accent Header Bar
  doc.setFillColor(230, 0, 18);
  doc.rect(0, 0, 105, 22, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('MUSC PUNE MATCHDAY PASS', 52.5, 12, { align: 'center' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICIAL SUPPORTERS CLUB TICKETING', 52.5, 17, { align: 'center' });

  // Ticket ID Badge Box
  doc.setDrawColor(230, 0, 18);
  doc.setFillColor(23, 23, 23);
  doc.roundedRect(8, 28, 89, 14, 2, 2, 'FD');

  doc.setTextColor(230, 0, 18);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('TICKET ID RECORD', 12, 33);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('courier', 'bold');
  doc.text(ticket.ticketId, 12, 39);

  // Match Title & Venue Details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(ticket.matchTitle, 8, 50);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  doc.text(`Venue: ${ticket.venue}`, 8, 56);
  doc.text(`Date & Time: ${ticket.date} @ ${ticket.time}`, 8, 61);

  // Holder Details
  doc.setDrawColor(50, 50, 50);
  doc.line(8, 65, 97, 65);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(`Pass Holder: ${ticket.userName}`, 8, 71);
  doc.text(`Quantity: ${ticket.quantity} Ticket(s)`, 8, 76);
  doc.text(`Total Amount: INR ${ticket.totalAmount}`, 8, 81);

  // QR Code Image Embedding
  if (ticket.qrDataUrl) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(30, 88, 45, 45, 2, 2, 'F');
    doc.addImage(ticket.qrDataUrl, 'PNG', 32.5, 90.5, 40, 40);
  }

  // Footer Instructions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(230, 0, 18);
  doc.text('PRESENT THIS QR CODE AT GATE FOR ENTRY', 52.5, 138, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(150, 150, 150);
  doc.text('MANCHESTER UNITED SUPPORTERS CLUB PUNE • EST. 2011', 52.5, 143, { align: 'center' });

  // Save PDF File
  doc.save(`${ticket.ticketId}-MUSC-Pune-Pass.pdf`);
};
