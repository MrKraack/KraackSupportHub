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

      <div class="ticketCommentContainer">
        <h2>Comments</h2>
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

    <div v-if="ticketDetails" class="detailSideBar">
      <div class="BackTicket">
        <router-link to="/tickets">X</router-link>

      </div>
      <div class="ticketDetailState">
        <h3>Ticket State</h3>
        <div v-if="!isUserRoleAdmin">
          <h4>{{ ticketDetails.TicketState }}</h4>
        </div>
        <select v-else v-model="ticketDetails.TicketState" @change="handleTicketChange">
          <option value="Unassigned">Unassigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Waiting for Input">Waiting for Input</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div class="ticketDetailAssigned">
        <h3>Assigned To</h3>
        <div v-if="!isUserRoleAdmin">
          <h4>{{ ticketDetails.TicketAssigned || 'Unassigned' }}</h4>
        </div>
        <select v-else v-model="ticketDetails.TicketAssigned" @change="handleTicketChange">
          <option value="Kasper">Kasper</option>
        </select>
      </div>

      <div class="ticketDetailPriority">
        <h3>Priority</h3>
        <div v-if="!isUserRoleAdmin">
          <h4>{{ ticketDetails.TicketPriority }}</h4>
        </div>
        <select v-else v-model="ticketDetails.TicketPriority" @change="handleTicketChange">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>


      <div class="ticketDetailCategory">
        <h3>Ticket Category</h3>
        <div v-if="!isUserRoleAdmin">
          <h4>{{ ticketDetails.TicketCategory }}</h4>
        </div>
        <select v-if="isUserRoleAdmin" v-model="ticketDetails.TicketCategory" @change="handleTicketChange">
          <option value="Support">Support</option>
          <option value="Fixing">Fixing</option>
          <option value="CreateNew">Create new</option>
          <option value="Changes">Changes</option>
          <option value="Requests">Requests</option>
        </select>
      </div>

      <div class="ticketDetailActions">

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
      currentUserRole: null

    }

  },
  props: {
    ticket: Object,
  },
  computed: {
    isUserRoleAdmin() {
      return this.currentUserRole === 1432;
    },
  },
  methods: {
    async FetchData() {
      //Get Ticket ID from Params
      let routerTicketId = this.$route.params.id;

      //Fetch ticket from Database using ID
      const response = await axios.get(`http://localhost:8081/ticket/${routerTicketId}`, {
        withCredentials: true,
      });
      
      let convertTicket = response.data.theTicket
      //Assign Ticket Object to Ticket Details
      this.ticketDetails = convertTicket;

      //Get userRole
      this.currentUserRole = response.data.userRole

    },
    handleTicketChange() {
      this.updateTicket();
    },

    async updateTicket() {
      // Your update logic here

      try {
        await axios.put(`http://localhost:8081/tickets/${this.ticketDetails.TicketID}`, {
          ticketData: this.ticketDetails,
        });
      } catch (error) {
        console.error('Error updating ticket:', error.message);
      }
    },

    async addCommentToTicket() {
      try {
        let commentInput = this.ticketCommentInput;
        let creatorName = this.ticketDetails.TicketCreatedBy;

        //#region Generate Date
        let currentDate = new Date();
        let currentDateFormat = currentDate.toLocaleString();
        let pattern = /(?<=, )[^,]+/;

        let match = currentDateFormat.match(pattern);

        let originalDateAndTime = currentDateFormat.split(', ')[0];
        let extractedValue = match[0];
        let createDateFormat = `${originalDateAndTime}, KL:${extractedValue.replace(/\.\d+$/, '')}`;

        //#endregion

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

    .ticketCommentContainer {
      width: 80%;

      h2 {
        margin: 5%;
      }

      .addCommentSection {

        form {
          display: flex;
          flex-direction: column;

          textarea {
            resize: none;
          }

        }


      }

      ul {
        display: flex;
        justify-content: start;
        padding: 0px;

        li {
          list-style-type: none;
        }
      }
    }



  }

  .detailSideBar {
    height: 100vh;
    width: 30%;


  }
}
</style>
  