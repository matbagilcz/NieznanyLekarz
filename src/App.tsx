import { useEffect, useState, useMemo } from 'react';
import Icon from './components/Icon'
import { DoctorType } from './components/Card/Card';
import { BaseButton } from './components/Button/Button';

import { useAppSelector, useAppDispatch } from './hooks'
import { setActiveCard } from './slices/activeCardSlice'

import doctorsJson from '../scripts/doctors_generated.json'
import CardsGrid from './components/CardGrid/CardsGrid';

import { debounce } from './utils';

export enum CARDS {
  ALL = 'All',
  FAVORITE = 'Favorite'
}

export default function App() {
  const [doctorsArray, setDoctorsArray] = useState<DoctorType[]>(doctorsJson)
  const [searchInput, setSearchInput] = useState<string>('')
  const activeCard = useAppSelector((state) => state.activeCard.value)
  const favoriteDoctorsArray = useAppSelector((state) => state.favoriteDoctor.doctorsArray)

  const dispatch = useAppDispatch()
  const onClick = (card: CARDS) => dispatch(setActiveCard(card))

  const debouncedChangeHandler = useMemo(
    () => debounce(setSearchInput, 300)
    , [])

  const filteredDoc = useMemo(() => {
    if (!searchInput) {
      return doctorsArray
    }
    return doctorsArray.filter(item => item.name.toLowerCase().includes(searchInput))
  }, [doctorsArray, searchInput])

  useEffect(() => {
    setDoctorsArray(activeCard === CARDS.ALL ? doctorsJson : favoriteDoctorsArray)
  }, [activeCard, favoriteDoctorsArray])

  return (
    <div className='mx-auto py-4 lg:py-12 h-full'>
      <div className='lg:grid lg:grid-cols-3 justify-between items-center mb-8 lg:px-40 px-4 space-y-2'>
        <h1 className="text-2xl">{activeCard} specialists ({filteredDoc?.length})</h1>
        <Navbar activeCard={activeCard} onClick={onClick} />
        <Searchbar onSearch={debouncedChangeHandler} />
      </div>
      <CardsGrid cardContent={filteredDoc} />
    </div>
  )
}

function Searchbar({ onSearch }: { onSearch: Function }) {
  return (
    <label className="relative block ml-auto">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4">
        <Icon id='magnifying-glass' />
      </span>
      <input
        className="h-12 bg-very-light-purple placeholder:text-bluey-grey block focus:bg-white w-full py-2 pl-12 pr-3 focus:shadow sm:text-sm outline-none transition cursor-pointer focus:cursor-text"
        placeholder="Search..."
        type="text"
        name="search"
        onChange={(e) => onSearch((e.target as HTMLInputElement).value.toLowerCase())} />
    </label>
  )
}

function Navbar({ activeCard, onClick }: { activeCard: CARDS, onClick: Function }) {
  const sharedStyles = 'border-y b-[#e2e4ec]'
  const activeCardStyles = 'bg-secondary text-white cursor-default shadow-[0_10px_21px_0px_#cbd4fa]'

  return (
    <div className='flex w-full lg:w-96 mx-auto'>
      <BaseButton text='All favorite' classNames={`border-x rounded-l ${sharedStyles} ${activeCard === CARDS.ALL ? activeCardStyles : 'hover:text-secondary'}`} onClick={() => onClick(CARDS.ALL)} />
      <BaseButton text='My specialists' classNames={`border-r rounded-r ${sharedStyles} ${activeCard === CARDS.FAVORITE ? activeCardStyles : 'hover:text-secondary'}`} onClick={() => onClick(CARDS.FAVORITE)} />
    </div>
  )
}

