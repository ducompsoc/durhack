export function faqLogic() {
    /**
     * Make FAQs clickable and unclickable.
     */
    function closeQuestions() {
        const open = document.querySelector('.faqs .question:not(.closed)');
        if (open) {
            const answer = open.querySelector('.answer')
            answer.onanimationend = (e) => {
                answer.onanimationend = (e) => {
                };
                answer.classList.remove('fade-out');
                open.classList.add('closed');
            }
            answer.classList.add('fade-out');
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
