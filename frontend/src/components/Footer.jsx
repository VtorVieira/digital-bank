import { FaLinkedin, FaGithub } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className='flex flex-col justify-center items-center border-solid border-2 bg-[#6b6b6b] mt-4 ml-4 mr-4 rounded-md text-[#ffff] font-bold md:absolute md:inset-x-1 md:bottom-0 xl:inset-x-16 2xl:inset-x-48'>
      <h3>Digital Bank</h3>
      <p>Created by <span>Vitor Vieira</span> &copy; 2022</p>
      <div className='flex'>
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
      <p>React, Tailwind, NodeJs, Postgres, Sequelize</p>
    </footer>
  );
}
