<template>
    <div class="businessOverviewContainer">

        <div class="businessHeader">
            <h1>All Business</h1>
            <router-link to="/business/create">

                <button>Create Business</button>
            </router-link>
           
        </div>

        <div v-if="businessList" class="businessListContainer">
            <table class="businessTable">
                <thead>
                    <th @click="sortBy('BusinessID')">ID</th>
                    <th @click="sortBy('BusinessName')">Name</th>
                    <th @click="sortBy('BusinessOwner')">Owner</th>
                    <th @click="sortBy('BusinessWebsite')">Website</th>
                    <th @click="sortBy('BusinessUsername')">Username</th>
                    <th @click="sortBy('BusinessPassword')">Password</th>
                </thead>

                <tbody>
                    <tr v-for="business in businessList" :key="business.BusinessID" @click="goToBusinessDetail(business)">
                        <td>{{ business.BusinessID }}</td>
                        <td>{{ business.BusinessName }}</td>
                        <td>{{ business.BusinessOwner }}</td>
                        <td>{{ business.BusinessWebsite }}</td>
                        <td>{{ business.BusinessUsername }}</td>
                        <td>{{ business.BusinessPassword }}</td>
                   
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
            businessList: null,
            sortKey: null,
            sortOrder: 1, // 1 for ascending, -1 for descending
        };
    },
    methods: {
        async FetchData() {
            try {
                const response = await axios.get("http://localhost:8081/business", {
                    withCredentials: true,
                });

                console.log(response.data)

                const businessData = response.data;
                // assign tickets to TicketData
                this.businessList = businessData;



            } catch (error) {
                console.error("Axios error:", error);
                // Handle errors
            }

        },
        goToBusinessDetail(business) {
            this.$router.push({ name: 'businessDetail', params: { id: business.BusinessID } });
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
            this.businessList.sort((a, b) => {
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
.businessOverviewContainer {
    padding-left: 10%;
    display: flex;
    flex-direction: column;
    justify-content: start;

    h1 {
        padding-left: 5%;
        color: #fff; /* White text color for better contrast */
    }

    .businessListContainer {
        display: flex;
        flex-direction: column;

        .businessTable {
            border-collapse: collapse;
            width: 100%;
            text-align: left;

            thead {
                th {
                    background-color: #333; /* Dark gray background */
                    color: #fff; /* White text color */
                    padding: 8px; /* Reduced padding */
                    font-size: 14px; /* Reduced font size */
                    font-weight: bold; /* Bold font */
                }

                border-bottom: 1rem solid #333; /* Dark gray border */
            }

            tbody {
                tr {
                    td {
                        padding: 8px;
                    }
                }

                tr:nth-child(even) {
                    background-color: #1f1f1f; /* Darker gray background for even rows */
                }

                tr:hover {
                    background-color: #2a2a2a; /* Darker background on hover */
                }
            }
        }

        button {
            background-color: #4CAF50; /* Green background */
            color: #fff; /* White text color */
            padding: 8px 12px; /* Padding */
            border: none; /* No border */
            cursor: pointer;
            border-radius: 4px; /* Rounded corners */
        }
    }
}
</style>


