<template>
    <div class="SpotEntry">
        <h3>{{ SpotEntry.name }}</h3>
        <ul>
            <li>{{ SpotEntry.location }}</li>
            <li>{{ SpotEntry.description }}</li>
            <li>{{ SpotEntry.capacity }}</li>
            <li>{{ SpotEntry.price }}</li>
        </ul>
    </div>
</template>

<script>
    export default{
        name: 'SpotTab',
        props:{
            SpotEntry:{
                type: Oject,
                required: true
            }
        }
    };


</script>
