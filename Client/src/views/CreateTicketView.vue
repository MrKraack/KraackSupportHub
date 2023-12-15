<template>
    <div class="createTicketContainer">
        <div class="createHeader">
            <h1>Create Ticket</h1>
        </div>
        <div class="createTicketData">
            <form @submit.prevent="submitTicketData">
                <div>
                    <label for="ticketTitle">Title</label>
                    <input v-model="ticketData.reqTicketTitel" type="text" id="ticketTitle" name="ticketTitle"
                        placeholder="Title">
                </div>
                <div>
                    <label for="ticketDescription">Description</label>
                    <textarea v-model="ticketData.reqTicketDescription" type="text" id="ticketDescription"
                        name="ticketDescription" placeholder="Description of ticket"></textarea>
                </div>
                <div class="selectionContainer">
                    <div>
                        <label for="priority">Priority</label>
                        <select v-model="ticketData.reqTicketPriority" id="priority" name="priority">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div>
                        <label for="category">Category</label>
                        <select v-model="ticketData.reqTicketCategory" id="category" name="category">
                            <option value="Support">Support</option>
                            <option value="Fixing">Fixing</option>
                            <option value="CreateNew">Create new</option>
                            <option value="Changes">Changes</option>
                            <option value="Requests">Requests</option>
                        </select>
                    </div>

                </div>

                <input type="submit" value="Create Ticket">

            </form>
        </div>

    </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';
export default {
    data() {
        return {
            ticketData: {
                reqTicketTitel: "",
                reqTicketDescription: "",
                reqTicketPriority: "",
                reqTicketCategory: "",
            }

        }
    },
    methods: {
        async submitTicketData() {
            try {
                const response = await axios.post('http://localhost:8081/tickets/create', this.ticketData);

                if (response.status === 200) {
                    // Handle success
                    router.push({name: "tickets"})
                } else {
                    // Handle error
                    console.error('Failed to create ticket');
                }
            } catch (error) {
                console.error('Error creating ticket:', error);
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.createTicketContainer {
    margin-left: 10%;



    .createTicketData {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        form {
            width: 50vw;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            div {
                width: 100%;
            }

            textarea {
                width: 100%;
                resize: none;
                border-radius: 50px;
            }

            input[type=text] {
                padding: 12px 20px;
                margin: 8px 0;
                box-sizing: border-box;
                width: 100%;
                border-radius: 50px;

            }

            select {
                width: 45%
            }


            input[type=submit] {
                width: 100%;
                background-color: #04AA6D;
                border: none;
                border-radius: 50px;
                color: white;
                padding: 16px 32px;
                text-decoration: none;
                margin: 4px 2px;
                cursor: pointer;
            }

            input,
            label {

                display: block;
            }

            .selectionContainer {
                display: flex;
            }
        }


    }
}</style>