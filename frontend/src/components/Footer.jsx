import { FaLinkedin, FaGithub } from 'react-icons/fa';

export function Footer() {
  return (
    <footer>
      <h3>Digital Bank</h3>
      <p>Created by <span>Vitor Vieira</span> &copy; 2022</p>
      <div>
        <label htmlFor="linkedIn">
          {' '}
          <abbr title="https://www.linkedin.com/in/vtorvieira/">
            <a href="https://www.linkedin.com/in/vtorvieira/" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </abbr>
        </label>
        <label htmlFor="gitHub">
          {' '}
          <abbr title="https://github.com/VtorVieira">
            <a href="https://github.com/VtorVieira" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
          </abbr>
        </label>
      </div>
      <p>React, HTML, Tailwind, NodeJs, Sequelize, MySql</p>
    </footer>
  );
}
