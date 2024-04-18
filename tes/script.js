// Function to adjust opacity based on visibility
const adjustOpacity = (entries, observer) => {
    entries.forEach(entry => {
        const textElements = entry.target.querySelectorAll('h2, p, ul li');
        
        if (entry.isIntersecting) {
            // Set opacity to 1 if section is visible
            textElements.forEach(element => {
                element.style.opacity = 1;
            });
        } else {
            // Fade out the text if section is not visible
            textElements.forEach(element => {
                element.style.opacity = 0.5;
            });
        }
    });
};

// Intersection Observer to handle section visibility and text opacity
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver(adjustOpacity, { threshold: 0.5 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Fetch content from content.txt
fetch('content.txt')
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n');
        const content = {};

        lines.forEach(line => {
            const [key, value] = line.split(': ');
            content[key.trim()] = value.trim();
        });

        // Populate HTML elements with fetched content
        document.getElementById('header_title').textContent = content.header_title;
        document.getElementById('mission_vision_title').textContent = content.mission_vision_title;
        document.getElementById('mission_vision_content').textContent = content.mission_vision_content;
        document.getElementById('background_title').textContent = content.background_title;
        document.getElementById('background_content').textContent = content.background_content;
        document.getElementById('team_title').textContent = content.team_title;
        document.getElementById('team_content').innerHTML = content.team_content.replace(/\n/g, '<br>');
        document.getElementById('values_title').textContent = content.values_title;
        
        const valuesList = document.getElementById('values_content');
        valuesList.innerHTML = ''; // Clear existing content
        content.values_content.split('\n').forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            valuesList.appendChild(li);
        });

        document.getElementById('achievements_title').textContent = content.achievements_title;
        const achievementsList = document.getElementById('achievements_content');
        achievementsList.innerHTML = ''; // Clear existing content
        content.achievements_content.split('\n').forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            achievementsList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error fetching content:', error);
    });
