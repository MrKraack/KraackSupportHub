<template>
  <div class="ticketContainer">

    <div v-if="ticketDetails" class="ticketDetailContainer">
      <div class="tikcetDetailRequester">
        <h2>{{ ticketDetails.TicketCreatedBy }}</h2>
      </div>
      <div class="ticketDetailHeader">
        <h1>{{ ticketDetails.TicketTitel }}</h1>
        <p>Created - {{ ticketDetails.TicketCreated }}</p>
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
        <router-link to="/tickets">
          <div class="back-icon">↩</div>
          Back to Tickets
        </router-link>
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
      const response = await axios.get(`http://localhost:8081/tickets/${routerTicketId}`, {
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
        
        //Get creator name 
        let response = await axios.get("http://localhost:8081/cookieInfo")
        let creatorName = response.data.user

        //#region Generate Date
         // Get current Date
        const currentDate = new Date();

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Months starts at 0, so add 1
        const year = currentDate.getFullYear();

        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();

        // If data is a number from 1 to 9, add a 0 in front
        const formattedDay = day < 10 ? `0${day}` : day; 
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        const currentDateFormat = `${formattedDay}/${formattedMonth}/${year}, KL:${formattedHours}.${formattedMinutes}`;

        //#endregion

        // Create an object with comment and creator's name
        let newComment = {
          comment: commentInput,
          creator: creatorName,
          createdDate: currentDateFormat
        };

        // Push the new comment object to the TicketComments array
        this.ticketDetails.TicketComments.push(newComment);

        // Clear the input field after adding the comment
        this.ticketCommentInput = "";

        // Update the ticket on MongoDB
        await axios.put(`http://localhost:8081/tickets/${this.ticketDetails.TicketID}`, {
          ticketData: this.ticketDetails

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
      /* Center text horizontally */

      h1 {
        color: #ff5733;
        /* Orange text color */
        font-size: 28px;
        margin: 10px 0;
      }

      p {
        margin: 0;
        color: #DDD;
        text-align: left;
      }
    }

    .ticketDetailDescription {
      margin: 20px 0;

      p {
        color: #FFF;
        /* White text color for better contrast */
      }
    }

    .ticketCommentContainer {
      width: 80%;

      h2 {
        margin: 20px 0;
        font-size: 24px;
        color: #ff5733;
        /* Orange text color */
      }

      .addCommentSection {
        form {
          display: flex;
          flex-direction: column;

          textarea {
            resize: none;
            margin-bottom: 10px;
            padding: 8px;
            border-radius: 5px;
            font-size: 14px;
            color: #242424;
            /* Dark text color */
            background-color: #FFF;
            /* White background */
          }

          input[type="submit"] {
            background-color: #ff5733;
            /* Orange button background */
            color: #FFF;
            /* White text color */
            padding: 8px 12px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-size: 14px;

            &:hover {
              background-color: #e55f2a;
              /* Darker orange on hover */
            }
          }
        }
      }

      ul {
        display: flex;
        flex-direction: column;
        padding: 0;

        li {
          list-style-type: none;
          margin-bottom: 20px;

          .commentHeader {
            margin-bottom: 5px;

            span {
              font-weight: bold;
              color: #AAA;
              /* Light gray text color */
            }
          }

          .commentBody {
            color: #FFF;
            /* White text color */
          }
        }
      }
    }
  }

  .detailSideBar {
    height: 100vh;
    width: 50%;
    padding: 20px;
    display: flex;
  flex-direction: column;

  align-items: center;

    .BackTicket {
      margin-bottom: 20px;

      a {
        text-decoration: none;
        color: #ff5733;
        /* Orange text color */
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
        text-align: center;

        .back-icon {
          margin-right: 10px;
          font-size: 24px;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .ticketDetailState,
    .ticketDetailAssigned,
    .ticketDetailPriority,
    .ticketDetailCategory {
      margin-bottom: 20px;

      h3 {
        margin-bottom: 10px;
        color: #ff5733;
        /* Orange text color */
        font-size: 18px;
      }

      h4 {
        color: #FFF;
        /* White text color */
        font-size: 16px;
        margin-bottom: 10px;
      }

      select {
        width: 100%;
        padding: 8px;
        font-size: 14px;
        background-color: #FFF;
        /* White background */
        color: #242424;
        /* Dark text color */
      }
    }
  }
}
</style>

  