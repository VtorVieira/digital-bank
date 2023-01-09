import { FaLinkedin, FaGithub } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className='flex flex-col justify-center items-center border-solid border-2 bg-[#6b6b6b] mt-4 ml-4 mr-4 rounded-md text-[#ffff] font-bold'>
      <h3>Digital Bank</h3>
      <div className='flex'>
        <p>Created by <span>Vitor Vieira</span> &copy; 2022</p>
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
      <p>React, Tailwind, NodeJs, Express, Postgres, Sequelize</p>
    </footer>
  );
}
