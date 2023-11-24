<template>
    <div class="ticketOverviewContainer">

        <div class="ticketHeader">
            <h1>All Tickets</h1>
        </div>

        <div class="ticketListContainer">
            <table class="ticketTable">
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
                        <td>{{ ticket.TicketPriority }}</td>
                        <td>{{ ticket.TicketCategory }}</td>
                        <td>{{ ticket.TicketState }}</td>
                    </tr>

                </tbody>
            </table>
        </div>


    </div>
</template>

<script>


export default {
    data() {
        return {
            ticketData: null,
            sortKey: null,
            sortOrder: 1, // 1 for ascending, -1 for descending
        };
    },
    methods: {
        async FetchData() {
            //Get userName from Localstorage
            let localUsername = localStorage.getItem("userName");
            console.log(localUsername)
            let response = await fetch(`http://localhost:8081/tickets/${localUsername}`)
            // const response = await fetch("http://localhost:8081/tickets")
            const listData = await response.json();
            // this.ticketData = listData
            this.ticketData = listData
            // console.log(this.ticketData)
            console.log(listData)

        },
        goToTicketDetail(ticket) {
            console.log('Navigating to Ticket Detail with:', ticket);
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


    h1 {
        padding-left: 5%;
    }

    .ticketListContainer {
        display: flex;
        flex-direction: column;

        .ticketTable {
            text-align: left;

            thead {
                border-bottom: 1rem solid green;
            }

            tbody {
                tr {
                    td {
                        padding: 0px;
                    }
                }

                tr:nth-child(even) {
                    background-color: red;

                }
            }
        }
    }


}
</style>

