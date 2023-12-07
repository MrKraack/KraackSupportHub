<template>
    <div class="businessContainer">

        <div v-if="businessDetails" class="businessDetailContainer">
            <div class="businessDetailName">
                <p><strong>Business Name: </strong>{{ businessDetails.BusinessName }}</p>
            </div>
            <div class="businessDetailOwner">
                <p><strong>Owner: </strong>{{ businessDetails.BusinessOwner }}</p>
            </div>
            <div class="businessDetailWebsite">
                <p><strong>Website: </strong>{{ businessDetails.BusinessWebsite }}</p>
            </div>
            <div class="businessDetailUsername">
                <p><strong>Username: </strong>{{ businessDetails.BusinessUsername }}</p>
            </div>
            <div class="businessDetailPassword">
                <p><strong>Password: </strong>{{ businessDetails.BusinessPassword }}</p>
            </div>


        </div>
    </div>
</template>
    
<script>
import axios from 'axios';

export default {
    data() {
        return {
            businessDetails: null,
            businessCommentInput: "",
        }
    },
    props: {
        business: Object,
    },
    methods: {
        async fetchData() {
            let routerBusinessId = this.$route.params.id;
            const response = await axios.get(`http://localhost:8081/business/${routerBusinessId}`, {
                withCredentials: true,
            });
            let convertBusiness = response.data;
            this.businessDetails = convertBusiness;
            console.log(this.businessDetails)
        },
        handleBusinessChange() {
            this.updateBusiness();
        },

    },
    created() {
        this.fetchData();
    }
};
</script>
    
<style lang="scss" scoped>
.businessContainer {
    margin-left: 20%;
    display: flex;

    .businessDetailContainer {
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        .businessDetailHeader {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            p {
                margin: 0px;
            }
        }

        
    }

   
}
</style>
