console.log("✅ Loaded students-filter.js");
// Sample student data - In a real application, this would come from a backend
const students = [
    {
        name: "Uduka Ephraim",
        image: "Ephraim.jpg",
        skills: ["graphics design", "canva", "illustrator", "wireframing"],
        portfolio: "https://pyp-guild.github.io/Ephraim_portfolio/",
        cohort: "2025",
        projects: ["Ecommerce Wireframe", "Portfolio Website"]
    },
    {
        name: "Joshua Chigozie",
        image: "joshua.jpg",
        skills: ["ui design", "responsive layouts", "python programming", "canva"],
        portfolio: "https://pyp-guild.github.io/Joshua-chigozie-portfolio/",
        cohort: "2025",
        projects: ["Portfolio Website", "Back to school flyers"]
    },
    {
        name: "Achuagu Collins",
        image: "achuagu-collins.jpg",
        skills: ["python programming", "problem solving", "graphics design", "vanilla js"],
        portfolio: "https://pyp-guild.github.io/Collins-Portfolio/",
        cohort: "2025",
        projects: ["API Service", "Portfolio Website"]
    },
    {
        name: "Alaafin Timileyin",
        image: "timi.jpg",
        skills: ["ui design", "Vanilla JS", "HTML/CSS", "responsive layouts"],
        portfolio: "https://pyp-guild.github.io/Timileyin-Portfolio/",
        cohort: "2025",
        projects: ["Portfolio website", "Graphics Design"]
    },
    {
        name: "Miles Nwabuzor",
        image: "miles.jpg",
        skills: ["responsive design", "vanilla js", "ui design", "graphics design"],
        portfolio: "https://pyp-guild.github.io/Miles-Portfolio-website/",
        cohort: "2025",
        projects: ["portfolio website", "Video editing"]
    },
    {
        name: "Chinemerem Ezenma",
        image: "chine.jpg",
        skills: ["Graphics Design", "python", "native js", "ui design"],
        portfolio: "https://pyp-guild.github.io/Chinemerem-Portfolio/",
        cohort: "2025",
        projects: ["Front-End Ui", "portfolio Website"]

    },
    {
        name: "John Udoka",
        image: "john.jpg",
        skills: ["graphics design", "python", "vanilla js", "ui design"],
        portfolio: "https://pyp-guild.github.io/John-Portfolio/",
        cohort: "2025",
        projects: ["portfolio website", "graphics design"]
    
    },
    {
        name: "Gabriel Utaka",
        image: "ggg(1).jpeg",
        skills: ["graphics design", "python", "vanilla js", "ui design"],
        portfolio: "https://pyp-guild.github.io/GABRIEL--PORTFOLIO/",
        cohort: "2025",
        projects: ["portfolio website", "graphics design"]
    
    },
    {
        name: "Roland Jacob",
        image: "IMG_1895 (1)(1).jpeg",
        skills: ["graphics design", "python", "vanilla js", "ui design"],
        portfolio: "https://pyp-guild.github.io/ROLAND-PORTFOLIO/",
        cohort: "2025",
        projects: ["portfolio website", "graphics design"]
    
    },
    {
        name: "Ngozi Udoka",
        image: "ngozi.jpg",
        skills: ["graphics design", "python programming", "vanilla js", "video editing"],
        portfolio: "https://pyp-guild.github.io/Ngozi-portfolio/",
        cohort: "2025",
        projects: ["portfolio website", "Rock, Paper, Scissors game"]
    }
];

// DOM Elements
const studentsGrid = document.querySelector('.students-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('#student-search');

// Create student cards
function createStudentCard(student) {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.innerHTML = `
        <div class="student-photo">
            <img src="${student.image}" alt="${student.name}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="student-info">
            <h3>${student.name}</h3>
            <p class="cohort">Cohort ${student.cohort}</p>
            <div class="skills-list">
                ${student.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <div class="projects-list">
                <h4>Projects:</h4>
                <ul>
                    ${student.projects.map(project => `<li>${project}</li>`).join('')}
                </ul>
            </div>
            <a href="${student.portfolio}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">View Portfolio</a>
        </div>
    `;
    return card;
}

// Filter students
function filterStudents() {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const searchTerm = searchInput.value.toLowerCase();

    studentsGrid.innerHTML = '';
    
    let matchedStudents = students.filter(student => {
        const matchesFilter = activeFilter === 'all' || student.skills.includes(activeFilter);
        const matchesSearch = student.name.toLowerCase().includes(searchTerm) ||
            student.skills.some(skill => skill.toLowerCase().includes(searchTerm));

        return matchesFilter && matchesSearch;
    });

    if (matchedStudents.length === 0) {
        studentsGrid.innerHTML = '<p class="no-results">No students found matching your criteria. Try a different filter!</p>';
    } else {
        matchedStudents.forEach((student, index) => {
            const card = createStudentCard(student);
            card.style.animationDelay = `${index * 0.1}s`;
            studentsGrid.appendChild(card);
        });
    }
}

// Event Listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterStudents();
    });
});

searchInput.addEventListener('input', filterStudents);

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    filterStudents();
    
    // Add smooth reveal animation
    const observeCards = () => {
        document.querySelectorAll('.student-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.animation = `fadeInUp 0.6s ease-out forwards`;
            card.style.animationDelay = `${index * 0.1}s`;
        });
    };
    
    observeCards();
});

// Debounce search input for performance
let searchTimeout;
const searchInputElement = document.querySelector('#student-search');
if (searchInputElement) {
    searchInputElement.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterStudents();
        }, 300);
    });
}
