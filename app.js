(function () {
    // ===== Section navigation =====
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        });
    });

    // ===== Theme toggle =====
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
})();

// ===== Interactive terminal =====
(function () {
    const body = document.getElementById("itermBody");
    const form = document.getElementById("itermForm");
    const input = document.getElementById("itermInput");
    const suggest = document.getElementById("itermSuggest");
    if (!body || !form || !input) return;

    const scrollDown = () => { body.scrollTop = body.scrollHeight; };

    function escapeHtml(s) {
        return s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    }

    function line(html, cls) {
        const div = document.createElement("div");
        div.className = "iterm-line" + (cls ? " " + cls : "");
        div.innerHTML = html;
        body.appendChild(div);
        scrollDown();
        return div;
    }

    // Print an array of lines sequentially for a subtle "typed" feel.
    function printLines(arr, done) {
        let i = 0;
        (function next() {
            if (i >= arr.length) { if (done) done(); return; }
            line(arr[i]);
            i++;
            setTimeout(next, 80);
        })();
    }

    const commands = {
        help() {
            return [
                "Available commands — type one, or tap a button:",
                "  <span class='iterm-accent'>about</span>     who I am",
                "  <span class='iterm-accent'>projects</span>  what I've built",
                "  <span class='iterm-accent'>skills</span>    my toolbox",
                "  <span class='iterm-accent'>contact</span>   how to reach me",
                "  <span class='iterm-accent'>resume</span>    download my CV",
                "  <span class='iterm-accent'>socials</span>   GitHub &amp; LinkedIn",
                "  <span class='iterm-accent'>clear</span>     clear the screen"
            ];
        },
        about() {
            return [
                "<span class='iterm-accent'>Rencho (Ranchhodbhai Aal)</span> — a curious enthusiast.",
                "B.Sc. Data, Science &amp; AI student at the University of Bayreuth,",
                "and Course Representative for the DSAI programme.",
                "I build AI systems, multi-agent tools and full-stack web apps.",
                "<span class='iterm-muted'>Next, try 'projects' or 'skills'.</span>"
            ];
        },
        whoami() { return this.about(); },
        projects() {
            return [
                "A few things I've built:",
                "  • <span class='iterm-accent'>RUS</span> — AI meeting assistant (live)",
                "  • <span class='iterm-accent'>Project Carola</span> — multi-agent MCP memory server",
                "  • <span class='iterm-accent'>AI Helper for Students</span> — learning platform (live)",
                "  • <span class='iterm-accent'>Vedarktech &amp; freelance web</span> — 2020–2024",
                "<span class='iterm-muted'>Open the Portfolio tab (briefcase icon) for details &amp; links.</span>"
            ];
        },
        skills() {
            return [
                "My toolbox:",
                "  <span class='iterm-accent'>languages</span>  Python · JS/TS · SQL · Java · C",
                "  <span class='iterm-accent'>frontend</span>   React · Next.js",
                "  <span class='iterm-accent'>backend</span>    FastAPI · FastMCP · PostgreSQL · SQLite",
                "  <span class='iterm-accent'>ai / ml</span>    Claude · Gemini · GPT · AssemblyAI · MCP · Ollama",
                "  <span class='iterm-accent'>design</span>     Figma · CorelDRAW"
            ];
        },
        contact() {
            return [
                "Let's talk:",
                "  email     <a href='mailto:me@therencho.com'>me@therencho.com</a>",
                "  location  Bayreuth, Germany",
                "  speaks    Gujarati · Hindi · English · German",
                "<span class='iterm-muted'>Or tap the envelope icon for the contact page.</span>"
            ];
        },
        socials() {
            return [
                "  github    <a href='https://github.com/therencho' target='_blank' rel='noopener noreferrer'>github.com/therencho</a>",
                "  linkedin  <a href='https://www.linkedin.com/in/therencho/' target='_blank' rel='noopener noreferrer'>linkedin.com/in/therencho</a>"
            ];
        },
        resume() {
            const a = document.createElement("a");
            a.href = "Rencho_CV.pdf";
            a.setAttribute("download", "");
            document.body.appendChild(a);
            a.click();
            a.remove();
            return ["Downloading my CV… 📄 <span class='iterm-muted'>(also the 'Download CV' button on the right)</span>"];
        },
        cv() { return this.resume(); },
        socialss() { return this.socials(); },
        clear() { body.innerHTML = ""; return null; },
        // little easter eggs
        ls() { return ["about  projects  skills  contact  resume  socials"]; },
        sudo() { return ["<span class='iterm-muted'>Nice try 😄 — no root for you here.</span>"]; },
        hello() { return ["Hey there 👋 — type <span class='iterm-accent'>help</span> to see what I can do."]; },
        hi() { return this.hello(); }
    };

    function run(raw) {
        const cmd = (raw || "").trim().toLowerCase();
        if (!cmd) return;
        line("<span class='iterm-prompt-inline'>$</span>" + escapeHtml(raw.trim()), "iterm-cmd");
        if (cmd === "clear") { commands.clear(); return; }
        const fn = commands[cmd];
        if (fn) {
            const out = fn.call(commands);
            if (out) printLines(out);
        } else {
            line("command not found: " + escapeHtml(cmd) + " — type <span class='iterm-accent'>help</span>", "iterm-muted");
        }
    }

    if (suggest) {
        suggest.addEventListener("click", e => {
            const btn = e.target.closest("button[data-cmd]");
            if (!btn) return;
            run(btn.dataset.cmd);
            input.focus();
        });
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        run(input.value);
        input.value = "";
    });

    // Intro message on load.
    printLines([
        "<span class='iterm-accent'>Hi, I'm Rencho 👋</span> — welcome to my interactive shell.",
        "<span class='iterm-muted'>New here? Tap a command button, or type 'help' and press Enter.</span>"
    ]);
})();
