import { AdminTicketRecord } from './ticketStore';

export const dispatchWhatsAppTicketMessage = (ticket: AdminTicketRecord, recipientPhone?: string) => {
  const targetPhone = (recipientPhone || ticket.userPhone || '7276735140').replace(/[^0-9]/g, '');
  const formattedPhone = targetPhone.length === 10 ? `91${targetPhone}` : targetPhone;

  const text = `🔴 *MUSC PUNE MATCHDAY TICKET PASS CONFIRMED* 🔴%0A%0A` +
    `*Ticket ID:* ${ticket.ticketId}%0A` +
    `*Match:* ${ticket.matchTitle}%0A` +
    `*Venue:* ${ticket.venue}%0A` +
    `*Date & Time:* ${ticket.date} @ ${ticket.time}%0A` +
    `*Holder:* ${ticket.userName}%0A` +
    `*Quantity:* ${ticket.quantity} Pass(es)%0A` +
    `*Total Paid:* ₹${ticket.totalAmount}%0A%0A` +
    `Present your QR code at the gate scanner at BIRA 91 Taproom, The Mills for entrance.%0A%0A` +
    `GLORY GLORY MAN UNITED! 🔴`;

  const waUrl = `https://wa.me/${formattedPhone}?text=${text}`;
  window.open(waUrl, '_blank');
};
