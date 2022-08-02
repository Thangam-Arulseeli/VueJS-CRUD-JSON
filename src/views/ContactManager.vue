<template>
<div class="container mt-3">
    <div class="row">
        <div class="col">
            <p class="h3 text-success fw-bold"> 
                Contact Manager 
                <router-link to="/contacts/add" class="btn btn-success btn-sm">
                    <i class="fa fa-plus-circle"> </i> New 
                </router-link>
            </p>
    

<p class="fst-italic"> Personal information is information or an opinion, including information or an opinion forming part of a database, whether true or not, and whether recorded in a material form or not, about an individual whose identity is apparent, or can reasonably be ascertained, from the information or opinion.

The concept of personal information is central to the Information Privacy Act 2009 (Qld) (IP Act). The objects of the IP Act are:

the fair collection and handling of personal information in the public sector environment
to provide a statutory right for individuals to access and amend their personal information held by entities in the public sector environment.
</p>
   <form>
    <div class="row">
        <div class="col-md-6">
            <div class="row">
                <div class="col">
                    Enter Search Name
                </div>
                <div class="col">
                    <input type="text" v-model="searchName" class="form-control" placeholder="Search Name"  />
                 <!-- <input type="submit" class="btn btn-outline-dark" /> -->
                </div>
            </div>
        </div>
    </div>
   </form>  
   
   <!-- Spinner -->
    <div v-if="loading">
    <div class="container">
        <div class="row">
            <div class="col">
                <Spinner />
            </div>
        </div>
    </div>
    </div>

    <!-- Error Message -->
    <div v-if="!loading && errorMessage">
    <div class="container mt-5">
        <div class="row">
            <div class="col">
                <p class="h3 text-danger fw-bold"> {{errorMessage}} </p>
            </div>
        </div>
    </div>
    </div>

   <div class="container mt-3" v-if="contacts.length > 0">
    <div class="row">
      <div class="col-md-6"  v-for="contact of filterContacts" :key="contact">
        <div class="card my-2 list-group-item-success shadow-lg">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-sm-4">
                        <img :src="contact.photo" 
                                    alt="contact.name" class="contact-img" /> 
                    </div>
                    <div class="col-sm-7">
                        <ul class="list-group">
                            <li class="list-group-item">
                                Name : <span class="fw-bold"> {{contact.name}}</span>
                            </li>
                            <li class="list-group-item">
                                Email : <span class="fw-bold"> {{contact.email}}</span>
                            </li>
                            <li class="list-group-item">
                                Mobile : <span class="fw-bold"> {{contact.mobile}}</span>
                            </li>
                        </ul>

                    </div>
                    <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                        <!-- <router-link to="/contacts/view/:contactId" -->
                        <router-link :to="`/contacts/view/${contact.id}`"
                            class="btn btn-warning my-1">
                            <i class="fa fa-eye"></i>
                        </router-link>
                        <!-- <router-link to="/contacts/edit/:contactId" -->
                           <router-link :to="`/contacts/edit/${contact.id}`"
                           class="btn btn-primary my-1">
                            <i class="fa fa-pen"></i>
                        </router-link>
                        <button class="btn btn-danger my-1" @click="clickDeleteContact(contact.id)">
                            <i class="fa fa-trash"> </i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </div>
   </div>
        </div>
    </div>
</div>

</template>

<script>
import { ContactService } from '@/services/ContactServices';
import Spinner from '@/components/Spinner.vue';

export default{
    name: "ContactManager",
    data: function () {
        return {
            loading: false,
            contacts: [],
            errorMessage: null,
            searchName: ''
        };
    },
    created: async function () {
        try {
            this.loading = true;
            // let response=await this.getAllContactsData();
            let response = await ContactService.getAllContacts();
            this.contacts = response.data;
            this.loading = false;
        }
        catch (error) {
            this.errorMessage = error;
            this.loading = false;
        }
    },
    computed: {
        filterContacts(){
            return this.contacts.filter(contact => contact.name.toLowerCase().includes(this.searchName.toLowerCase()));
        }
    },
    methods: {
    // getAllContactsData : async function(){
    //     return await ContactService.getAllContacts();
    // }

    clickDeleteContact: async function(contactId){
        try{
            this.loading=true;
            let response = await ContactService.deleteContact(contactId);
            if (response){
                let response = await ContactService.getAllContacts();  // gets the fresh data after deletion
                this.contacts = response.data;
                this.loading = false;
            }
        }
        catch (error){
            this.errorMessage=error;
            this.loading=false;
        }
    }
    },
    components: { Spinner }
}
</script>

<style scoped>


</style>