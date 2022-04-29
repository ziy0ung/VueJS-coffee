<template>
    <li class="memo-item">
        <strong>{{ memo.title }}</strong>
        <p>{{ memo.content }}</p>
        <button type="button"><i class="fas fa-times"></i></button>
    </li>
</template>

<script>
export default {
    name: 'Memo',
    props: {
        memo: {
            type: Object
        }
    }
}
</script>