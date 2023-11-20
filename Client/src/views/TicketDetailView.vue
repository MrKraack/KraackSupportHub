<template>
    <div>
      <h1>Ticket Details</h1>
      <div>
        <p>Requester: {{ ticketDetails.TicketCreatedBy }}</p>
        <p>Title: {{ ticketDetails.TicketTitel }}</p>
        <p>Priority: {{ ticketDetails.TicketPriority }}</p>
        <p>Category: {{ ticketDetails.TicketCategory }}</p>
        <p>Status: {{ ticketDetails.TicketState }}</p>
        <!-- Add more details as needed -->
      </div>
    </div>
  </template>
  
  <script>
  // In your TicketDetailView.vue component
export default {
  data(){
    return{

      ticketDetails: null
    }
    
  },
  props: {
    ticket: Object,
  },
  methods: {
    async FetchData(){
      let routerTicketId = this.$route.params.id;
      console.log(routerTicketId)
      let fetchedTicket = await fetch(`http://localhost:8081/tickets/${routerTicketId}`)
      let convertTicket = await fetchedTicket.json()
      console.log(convertTicket)
      // this.ticketDetails = convertTicket;
      


    }
  },
  mounted(){
    this.FetchData()
    
  }
};

  </script>
  
  <style scoped>
  /* Add your styling for the ticket detail view */
  </style>
  