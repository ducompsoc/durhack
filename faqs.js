export function faqLogic() {
    /**
     * Make FAQs clickable and unclickable.
     */
    function closeQuestions() {
        const open = document.querySelector('.faqs .question:not(.closed)');
        if (open) {
            open.classList.add('closed');
        }
    }

    document.addEventListener('click', () => {
        closeQuestions();
    });

    document.querySelectorAll('.faqs .question').forEach(element => {
        element.querySelector('.title').addEventListener('click', event => {
            const isClosed = element.classList.contains('closed');
            closeQuestions();
            if (isClosed) {
                element.classList.remove('closed');
            }

            event.stopPropagation();
        });
    });
}
