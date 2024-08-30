const jsonData = {
    "SOFTWARE LANGUAGES": {
        "SCRIPTING LANG.": [
            "Python",
            "Javascript",
            "Ruby",
            "PHP",
            "Perl",
            "Tcl",
            "Lua",
            "R"
        ],
        "OBJECT-ORIENTED LANG.": [
            "Java",
            "C#",
            "C++",
            "Delphi",
            "Swift",
            "Kotlin",
            "Scala"
        ],
        // ...
    },
    "WEB DEVELOPMENT": {
        "FRONTEND FRAMEWORKS": [
            "React",
            "Angular",
            "Vue.js",
            "Ember.js",
            "Backbone.js",
            "Riot.js"
        ],
        "BACKEND FRAMEWORKS": [
            "Node.js",
            "Django",
            "Flask",
            "Ruby on Rails",
            "Laravel",
            "Spring Boot",
            "Express.js",
            "Koa.js",
            "Pyramid",
            "Phoenix"
        ],
        // ...
    }
};

const tableHtml = [];

for (const category in jsonData) {
    const categoryHtml = `<section id="${category.toLowerCase().replace(/\s+/g, '-')}"">
        <h2>${category}</h2>
        <table>
            <tr>
                <th>Category</th>
                <th>Languages</th>
            </tr>`;

    for (const subcategory in jsonData[category]) {
        const languages = jsonData[category][subcategory].join(', ');
        categoryHtml += `<tr>
            <td>${subcategory}</td>
            <td>${languages}</td>
        </tr>`;
    }

    categoryHtml += `</table>
    </section>`;

    tableHtml.push(categoryHtml);
}

const html = `<body>
    <header>
        <h1>Programming Languages and Tools</h1>
    </header>
    <main>
        ${tableHtml.join('')}
    </main>
    <footer>
        <p>&copy; 2024 MefameX</p>
    </footer>
</body>`;

document.body.innerHTML = html;