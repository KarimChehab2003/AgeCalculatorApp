const allDateInputs = Array.from(document.querySelectorAll(".date-input"));
const allDateLabels = Array.from(document.querySelectorAll(".date-input-label"));
const calculateAgeButton = document.querySelector(".calculateAgeButton");

const dayInput = document.getElementById('dayInput');
const monthInput = document.getElementById('monthInput');
const yearInput = document.getElementById('yearInput');

const dayOutput = document.getElementById('dayOutput')
const monthOutput = document.getElementById('monthOutput');
const yearOutput = document.getElementById('yearOutput');

function changeColorsToRed(input) {
    let label = input.previousElementSibling;

    label.classList.remove("text-secondary");
    label.classList.add("text-danger");

    input.style.borderColor = "#dc3545"
    input.style.setProperty('--bs-focus-ring-color', '#dc3545', 'important')
}

function changeColorsToDefault(input) {
    let label = input.previousElementSibling;
    let feedback = input.nextElementSibling;

    input.style.borderColor = "#dee2e6";
    input.style.setProperty('--bs-focus-ring-color', '#b278ff', 'important')

    label.classList.add("text-secondary");
    label.classList.remove("text-danger");

    feedback.innerHTML = "";
}

function writeInvalidFeedback(elementID, message) {
    const feedbackDiv = document.getElementById(elementID);
    feedbackDiv.innerHTML = message;
}

function isInputEmpty() {
    let isEmpty = false;
    allDateInputs.forEach((input) => {
        if (input.value == "") {
            let feedbackDiv = input.nextElementSibling;
            changeColorsToRed(input);
            writeInvalidFeedback(feedbackDiv.id, "This field is required")
            isEmpty = true;
        }
        else {
            changeColorsToDefault(input);
            isEmpty = false;
        }
    })
    return isEmpty;
}

function isValidRange() {
    let day = parseInt(dayInput.value)
    let month = parseInt(monthInput.value)
    let year = parseInt(yearInput.value);
    let isValidRange = true;

    if (!(day > 0 && day <= 31)) {
        changeColorsToRed(dayInput);
        writeInvalidFeedback("invalid-feedback-day", "Must be a valid day");
        isValidRange = false;
    }

    if (!(month > 0 && month <= 12)) {
        changeColorsToRed(monthInput);
        writeInvalidFeedback("invalid-feedback-month", "Must be a valid month");
        isValidRange = false;
    }

    if (!(year > 1920 && year <= 2024)) {
        changeColorsToRed(yearInput);
        writeInvalidFeedback("invalid-feedback-year", "Must be a valid year");
        isValidRange = false;
    }
    return isValidRange;
}

function isValidDate() {
    let dateEntered = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
    let isValidDate = true;

    if (dateEntered.getFullYear() != yearInput.value || dateEntered.getMonth() != monthInput.value - 1 || dateEntered.getDate() != dayInput.value) {
        allDateInputs.forEach((input) => {
            changeColorsToRed(input);
        })
        writeInvalidFeedback("invalid-feedback-day", "Must be a valid date");
        isValidDate = false;
    } else
        allDateInputs.forEach((input) => {
            changeColorsToDefault(input);
            isValidDate = true
        })
    return isValidDate;
}

calculateAgeButton.addEventListener('click', () => {
    if (!isInputEmpty() && isValidRange() && isValidDate()) {

        const date = new Date();
        let yearDifference = date.getFullYear() - yearInput.value;
        let monthDifference = date.getMonth() + 1 - monthInput.value;
        let dayDifference = date.getDate() - dayInput.value;

        if (dayDifference < 0) {
            monthDifference--;

            let previousMonth = date.getMonth() - 1;
            if (previousMonth < 1) {
                previousMonth = 12;
            }
            const daysInPreviousMonth = new Date(currentYear, previousMonth, 0).getDate();
            dayDifference += daysInPreviousMonth;
        }

        if (monthDifference < 0) {
            yearDifference--;
            monthDifference += 12;
        }

        yearOutput.innerHTML = yearDifference;
        monthOutput.innerHTML = monthDifference;
        dayOutput.innerHTML = dayDifference;
    }
})

