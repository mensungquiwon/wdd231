const navbutton = document.querySelector("#ham-btn");
const navEl = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navEl.classList.toggle('show');
    navbutton.classList.toggle('show');
});

const year = document.querySelector("#currentYear");
const today = new Date();
const month = today.getMonth() + 1;
const date = today.getDate();
const fullYear = today.getFullYear();
year.innerHTML = `${today.getFullYear()}`;
document.getElementById("lastModified").textContent = "Last Modified: " + month + "/" + date + "/" + fullYear;



const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    }
]

const coursesSection = document.querySelector('#courses');
const totalCreditsEl = document.querySelector('#total-credits');
const courseFilters = document.querySelectorAll('#course-filters button');

let currentFilter = 'all';

const completedCourses = courses.filter(course => course.completed);

function renderCourses(filteredCourses) {
    if (!coursesSection) return;

    // Remove existing list if any
    const existingList = coursesSection.querySelector('ul:not(.course-filters)');
    if (existingList) existingList.remove();

    const list = document.createElement('ul');

    filteredCourses.forEach(course => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="#" tabindex="0">
                <strong>${course.subject} ${course.number}</strong>
            </a>
        `;
        list.appendChild(li);
    });

    coursesSection.appendChild(list);
}

function renderTotalCredits(filteredCourses) {
    if (!totalCreditsEl) return;

    const total = filteredCourses.reduce((sum, course) => sum + (course.credits ?? 0), 0);
    totalCreditsEl.textContent = `The total credits for the courses listed above is ${total}.`;
}

function applyFilter() {
    let filteredCourses;
    if (currentFilter === 'All') {
        filteredCourses = completedCourses;
    } else {
        filteredCourses = completedCourses.filter(course => course.subject === currentFilter);
    }
    renderCourses(filteredCourses);
    renderTotalCredits(filteredCourses);
}

courseFilters.forEach(button => {
    button.addEventListener('click', () => {
        currentFilter = button.textContent;
        applyFilter();
    });
});

// Initial render
applyFilter();
