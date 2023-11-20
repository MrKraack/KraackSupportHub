<template>
    <div>
      <h1>Ticket Details</h1>
      <div>
        <p>ID: {{ ticket.TicketID }}</p>
        <p>Requester: {{ ticket.TicketCreatedBy }}</p>
        <p>Title: {{ ticket.TicketTitel }}</p>
        <p>Priority: {{ ticket.TicketPriority }}</p>
        <p>Category: {{ ticket.TicketCategory }}</p>
        <p>Status: {{ ticket.TicketState }}</p>
        <!-- Add more details as needed -->
      </div>
    </div>
  </template>
  
  <script>
  // In your TicketDetailView.vue component
export default {
  props: {
    ticket: Object,
  },
  created() {
    console.log('Ticket Detail View created with prop:', this.ticket);
  },
};

  </script>
  
  <style scoped>
  /* Add your styling for the ticket detail view */
  </style>
  