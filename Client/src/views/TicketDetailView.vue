<template>
  <div class="ticketContainer">

    <div v-if="ticketDetails" class="ticketDetailContainer">
      <div class="tikcetDetailRequester">
        <h2>{{ ticketDetails.TicketCreatedBy }}</h2>
      </div>
      <div class="ticketDetailHeader">
        <h1>{{ ticketDetails.TicketTitel }}</h1>
        <p>{{ ticketDetails.TicketCreated }}</p>
      </div>
      <div class="ticketDetailDescription">
        <p>{{ ticketDetails.TicketDescription }}</p>
      </div>


    </div>

    <div v-if="ticketDetails" class="detailSideBar">

      <div class="BackTicket">
        <router-link to="/tickets">X</router-link>

      </div>
      <div class="ticketDetailState">
        <h3>Ticket State</h3>
        <!-- Drop down menu with different states           -->


      </div>
      <div class="ticketDetailAssigned">

      </div>
      <div class="ticketDetailPriority">

      </div>
      <div class="ticketDetailCategory">

      </div>
      <div class="ticketDetailActions">

      </div>
      <div class="ticketCommentContainer">
        <div class="addCommentSection">
          <form @submit.prevent="addCommentToTicket">

            <textarea v-model="ticketCommentInput">

                    </textarea>
            <input type="submit" value="Add Comment">
          </form>
        </div>
        <ul>
          <li v-for="comment in ticketDetails.TicketComments" :key="comment">
            <div class="commentHeader">
              <span><strong>{{ comment.creator }}</strong> - {{ comment.createdDate }}</span>
            </div>
            <div class="commentBody">
              {{ comment.comment }}
            </div>
          </li>
        </ul>
      </div>
    </div>


  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {

      ticketDetails: null,
      ticketCommentInput: "",

    }

  },
  props: {
    ticket: Object,
  },
  methods: {
    async FetchData() {
      //Get Ticket ID from Params
      let routerTicketId = this.$route.params.id;
      //Fetch ticket from Database using ID
      let fetchedTicket = await fetch(`http://localhost:8081/tickets/${routerTicketId}`)
      //Convert Ticket to JSON Object
      let convertTicket = await fetchedTicket.json()
      //Assign Ticket Object to Ticket Details
      this.ticketDetails = convertTicket;


    },

    async addCommentToTicket() {
      try {
        let commentInput = this.ticketCommentInput;
        let creatorName = this.ticketDetails.TicketCreatedBy;

        let currentDate = new Date();
        let currentDateFormat = currentDate.toLocaleString();
        let pattern = /(?<=, )[^,]+/;

        let match = currentDateFormat.match(pattern);

        let originalDateAndTime = currentDateFormat.split(', ')[0];
        let extractedValue = match[0];
        let createDateFormat = `${originalDateAndTime}, KL:${extractedValue.replace(/\.\d+$/, '')}`;

        // Create an object with comment and creator's name
        let newComment = {
          comment: commentInput,
          creator: creatorName,
          createdDate: createDateFormat
        };

        // Push the new comment object to the TicketComments array
        this.ticketDetails.TicketComments.push(newComment);

        // Clear the input field after adding the comment
        this.ticketCommentInput = "";

        // Update the ticket on MongoDB
        await axios.put(`http://localhost:8081/tickets/${this.ticketDetails.TicketID}`, {
          reqTicketComments: this.ticketDetails.TicketComments
        });


      } catch (error) {
        console.error('Error updating ticket:', error.message);
      }
    },
  },
  created() {
    this.FetchData()

  }
};

</script>
  
<style lang="scss" scoped>
.ticketContainer {
  margin-left: 20%;
  display: flex;

  .ticketDetailContainer {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .ticketDetailHeader {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      p {
        margin: 0px;
      }
    }



  }

  .detailSideBar {
    height: 100vh;
    width: 30%;

    .ticketCommentContainer {
      .addCommentSection {

        form {
          display: flex;
          flex-direction: column;

          textarea {
            resize: none;
          }

        }


      }

      ul li {
        list-style-type: none;
      }
    }
  }
}
</style>
  