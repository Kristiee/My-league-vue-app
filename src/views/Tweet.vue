<template>
    <a class="twitter-timeline" :href="`https://twitter.com/${tweetid}`"> Tweets by @{{tweetid}} </a>
</template>
<script>
export default {
    props: ["tweetid"]
    
}
</script>