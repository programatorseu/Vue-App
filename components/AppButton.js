export default {
    template: `
    <button 
        class="bg-gray-200 hover:bg-gray-400 border rounded px-5 py-2"
        :disabled="processing">
        <slot />
    </button>
`,
data() {
    return {
        processing: true
    };
}
}