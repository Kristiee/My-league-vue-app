<template>
    <a class="twitter-timeline" data-lang="en" data-dnt="true" data-theme="light" 
    :href="`https://twitter.com/${tweetid}/likes`">Tweets by TwitterDev</a> 

</template>
<script>
export default {
    props: ["tweetid"]
    
}
</script>