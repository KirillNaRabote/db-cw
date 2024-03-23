import {FC, useState} from "react";
import {FaSearch} from "react-icons/fa";

const Search: FC = () => {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className='w-full'>
            <form className='flex items-center'
            >
                <input
                    className='bg-black h-9 p-3 rounded-l-xl outline-none text-white'
                    placeholder='Поиск'
                    /*onChange={(event) => setSearchTerm(event.target.value)}
                    value={searchTerm}*/
                />
                <button className='flex bg-primary h-9 w-10 justify-center items-center rounded-r-xl'><FaSearch/></button>
            </form>
        </div>
    )
}

export default Search