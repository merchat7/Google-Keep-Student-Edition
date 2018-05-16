<style>

.subject {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 5px #ccc;
    padding: 10px;
    margin: 8px 0;
    width: 100%;
}

.subject h1 {
    font-size: 1.1em;
    margin-bottom: 6px;
    word-wrap: break-word;
}

.subject pre {
    font-size: 1.1em;
    margin-bottom: 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
}

</style>

<template>

<div class="subject">
    <h1>{{subject.subject}}</h1>
    <pre>{{subject.lecturer}}</pre>
    <pre>{{subject.timeFrom}}</pre>
    <pre>{{subject.timeTo}}</pre>
    <div id="myKey" style="display: none;">{{subject.key}}</div>
</div>

</template>

<script>

export default {
    props: ['subject']
}

</script>
