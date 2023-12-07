<template>
    <div class="createTicketContainer">
        <div class="createTicketData">
            <form @submit.prevent="submitTicketData">
                <div>
                    <label for="businessName">Name</label>
                    <input v-model="businessData.reqBusinessName" type="text" id="businessName" name="businessName"
                        placeholder="Name">
                </div>
                <div>
                    <label for="businessOwner">Owner</label>
                    <input v-model="businessData.reqBusinessOwner" type="text" id="businessOwner" name="businessOwner"
                        placeholder="Owner">
                </div>
                <div>
                    <label for="businessWebsite">Website</label>
                    <input v-model="businessData.reqBusinessWebsite" type="text" id="businessWebsite" name="businessWebsite"
                        placeholder="Website">
                </div>
                <div>
                    <label for="businessUsername">Username</label>
                    <input v-model="businessData.reqBusinessUsername" type="text" id="businessUsername"
                        name="businessUsername" placeholder="Username">
                </div>
                <div>
                    <label for="businessPassword">Password</label>
                    <input v-model="businessData.reqBusinessPassword" type="password" id="businessPassword"
                        name="businessPassword" placeholder="Password">
                </div>

                <input type="submit" value="Create Business">
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
            businessData: {
                reqBusinessName: "",
                reqBusinessOwner: "",
                reqBusinessWebsite: "",
                reqBusinessUsername: "",
                reqBusinessPassword: ""
            }
        }
    },
    methods: {
        async submitTicketData() {
            try {
                const response = await axios.post('http://localhost:8081/business/create', this.businessData);

                if (response.status === 200) {
                    // Handle success
                    router.push({ name: "business" });
                } else {
                    // Handle error
                    console.error('Failed to create business');
                }
            } catch (error) {
                console.error('Error creating business:', error);
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
            }

            input[type=text] {
                padding: 12px 20px;
                margin: 8px 0;
                box-sizing: border-box;
                width: 100%;
            }

            select {
                width: 45%
            }


            input[type=submit] {
                width: 100%;
                background-color: #04AA6D;
                border: none;
                border-radius: 14%;
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
}
</style>