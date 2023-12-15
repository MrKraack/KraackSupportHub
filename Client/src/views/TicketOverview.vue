<template>
    <div class="ticketOverviewContainer">

        <div class="ticketHeader">
            <h1>All Tickets</h1>
            <router-link :to="{ name: 'createTicket' }">
                <button>Create Ticket</button>
            </router-link>
        </div>

        <div v-if="ticketData" class="ticketListContainer">
            <table class="ticketTable" cellspacing="0">
                <thead>
                    <th @click="sortBy('TicketID')">ID</th>
                    <th @click="sortBy('TicketCreatedBy')">Requester</th>
                    <th @click="sortBy('TicketTitel')">Title</th>
                    <th @click="sortBy('TicketPriority')">Priority</th>
                    <th @click="sortBy('TicketCategory')">Category</th>
                    <th @click="sortBy('TicketState')">Status</th>
                </thead>

                <tbody>
                    <tr v-for="ticket in ticketData" :key="ticket.TicketID" @click="goToTicketDetail(ticket)">
                        <td>{{ ticket.TicketID }}</td>
                        <td>{{ ticket.TicketCreatedBy }}</td>
                        <td>{{ ticket.TicketTitel }}</td>
                        <td :style="{ color: getPriorityColor(ticket.TicketPriority) }">{{ ticket.TicketPriority }}</td>
                        <td>{{ ticket.TicketCategory }}</td>
                        <td>{{ ticket.TicketState }}</td>
                    </tr>

                </tbody>
            </table>
        </div>


    </div>
</template>

<script>
import axios from 'axios';


export default {
    data() {
        return {
            ticketData: null,
            sortKey: null,
            sortOrder: 1, // 1 for ascending, -1 for descending
            userRole: null
        };
    },
    methods: {
        async FetchData() {


            try {
                const response = await axios.get("http://localhost:8081/tickets", {
                    withCredentials: true,
                });

                const listData = response.data.Tickets;
                // assign tickets to TicketData
                this.ticketData = listData;

                //Get userRole
                this.userRole = response.data.role



            } catch (error) {
                console.error("Axios error:", error);
                // Handle errors
            }

        },
        goToTicketDetail(ticket) {
            this.$router.push({ name: 'ticketDetail', params: { id: ticket.TicketID } });
        },
        sortBy(key) {
            // If the same key is clicked again, reverse the order
            if (key === this.sortKey) {
                this.sortOrder *= -1;
            } else {
                this.sortKey = key;
                this.sortOrder = 1; // Default to ascending order
            }

            // Use Array.sort to sort the data based on the selected key and order
            this.ticketData.sort((a, b) => {
                const valueA = a[this.sortKey];
                const valueB = b[this.sortKey];

                if (valueA < valueB) {
                    return -1 * this.sortOrder;
                } else if (valueA > valueB) {
                    return 1 * this.sortOrder;
                } else {
                    return 0;
                }
            });
        },
        getPriorityColor(priority) {
            switch (priority) {
                case 'High':
                    return 'red';
                case 'Medium':
                    return 'yellow';
                case 'Low':
                    return 'green';
                default:
                    return ''; // default if nothing
            }
        }
    },
    mounted() {
        this.FetchData()
    }

}
</script>

<style lang="scss" scoped>
.ticketOverviewContainer {
    padding-left: 10%;
    display: flex;
    flex-direction: column;
    justify-content: start;

    .ticketHeader {
        display: flex;
        align-items: center;
        justify-content: space-between; /* Align h1 to the center and button to the right */
        width: 100%; /* Ensure the header takes up the full width */

        h1 {
            color: #ff5733; 
            font-size: 3em;
            
            text-align: center; 
            flex-grow: 1; /* Allow the h1 to take up available space */
        }

        button {
            background-color: #4CAF50;
            color: #fff;
            padding: 8px 12px;
            margin-right: 50px; /* Add margin to the left of the button */
            border: none;
            cursor: pointer;
            border-radius: 4px;
            font-size: 14px;

            &:hover {
                background-color: #45a049;
            }
        }
    }

    .ticketListContainer {
        display: flex;
        flex-direction: column;

        .ticketTable {
            width: 100%;
            text-align: left;

            thead {
                th {
                    background-color: #333;
                    color: #fff;
                    padding: 8px;
                    font-size: 14px;
                    font-weight: bold;
                }

                border-bottom: 1rem solid #333;
            }

            tbody {
                tr {
                    td {
                        padding: 8px;

                        &:nth-child(4) {
                            font-weight: bold;
                        }
                    }
                }

                tr:nth-child(even) {
                    background-color: #1f1f1f;
                }

                tr:hover {
                    background-color: #2a2a2a;
                }
            }
        }
    }
}
</style>
