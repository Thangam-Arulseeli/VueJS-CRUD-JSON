<template>
<div class="container mt-3">
    <div class="row">
        <div class="col">
            <p class="h3 text-success fw-bold">
                Add Contact
            </p>
            <p classs="fst-italic"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                 distinctio voluptatum voluptatem in beatae officiis ab illo totam aperiam explicabo,
                  veniam labore illum possimus qui corrupti, architecto,
                   alias optio accusamus.</p>
        </div>
    </div>
</div>
<!-- {{contact}} -->
<div class="container" mt-3>
    <div class="row">
        <div class="col-md-4">
            <form @submit.prevent="submitCreate()">
                <div class="mb-2">
                    <input type="text" required v-model="contact.name" class="form-control" placeholder="Name" />
                </div>
                <div class="mb-2">
                    <input type="text" required  v-model="contact.photo" class="form-control" placeholder="Photo URL" />
                </div>
                  <div class="mb-2">
                    <input type="text" required v-model="contact.email" class="form-control" placeholder="Email" />
                </div>
                <div class="mb-2">
                    <input type="text" required v-model="contact.mobile" class="form-control" placeholder="Mobile" />
                </div>
                  <div class="mb-2">
                    <input type="text" v-model="contact.company" class="form-control" placeholder="Company" />
                </div>
                  <div class="mb-2">
                    <input type="text" required v-model='contact.title' class="form-control" placeholder="Title" />
                </div>
                  <div class="mb-2">
                    <select required v-model="contact.groupId" class="form-control" v-if="groups.length > 0" >
                        <option value="" > Select Group </option>
                        <option :value="group.id" v-for="group of groups" :key="group.id"> {{group.name}}</option>
                    </select>
                    </div>
                    <div class="mb-2">
                        <input type="submit" class="form-control btn btn-success" value="Create" />
                    </div>
                </form>
        </div>
        <div class="col-md-4">
            <img :src="contact.photo" alt="" class="contact-img" />
        </div>
    </div>
</div>
<!-- <pre> {{contact}}</pre> -->
</template>

<script>
import { ContactService } from '@/services/ContactServices'

export default{
    name: "AddContact",
    data: function(){
        return{
            contact: {
            name: '',
            company: '',
            email: '',
            title: '',
            mobile: '',
            photo: '',
            groupId: ''
            },
        groups: []
        }
    },
    created: async function(){
        try{
            let response=await ContactService.getAllGroups();
            this.groups=response.data;
        }
        catch (error){
            console.log(error);
        }
    },
    methods:{
        submitCreate: async function(){
            try{
                let response = await ContactService.createContact(this.contact);
                if (response){
                    return this.$router.push('/');
                }
              else{
               return this.$router.push(`/contacts/add`);
            }
        }
        catch(error){
            console.log(error);
        }
        }
    }
}
</script>

<style scoped>

</style>