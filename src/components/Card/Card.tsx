import { useState, useMemo } from 'react'
import Icon, { IconsId } from "../Icon"
import { BaseButton } from '../Button';
import { addDoctorToFavorites, removeDoctorFromFavorites } from '../../slices/favoriteDoctorsSlice';
import { useAppSelector, useAppDispatch } from '../../hooks'

export type DoctorType = {
  name: string,
  specialisation: string,
  ID: string,
  numberOfReviews: number,
  sumOfReviews: number,
  avatar: string | null,
  userVote: number,
  index?: number,
  style?: React.CSSProperties
}

export type GridCardProps = {
  index: number,
  style: React.CSSProperties,
  data: DoctorType[]
}

type UserType = Omit<DoctorType, 'numberOfReviews' | 'sumOfReviews'>

function RatingItem({ isActive }: { isActive: boolean }) {
  return <Icon id="star" className={`rounded-sm fill-white stroke-white p-1 ${isActive ? 'bg-[#06E3EF]' : 'bg-[#d8dced]'} `} />
}

function Rating({ rating, setRating }: { rating: number, setRating: Function }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1 p-6 pr-0">
      {[...Array(5)].map((item, index) => {
        const itemRatingValue = index + 1;
        return (
          <button
            type="button"
            key={index}
            onClick={() => setRating(itemRatingValue)}
            onMouseEnter={() => setHover(itemRatingValue)}
            onMouseLeave={() => setHover(rating)}
          >
            <RatingItem key={index} isActive={itemRatingValue <= (hover || rating)} />
          </button>)
      })}
    </div>
  )
}

function IconButton({ id }: { id: string }) {
  return (
    <button className="group flex-1 p-3 h-12 hover:border-b-2 hover:border-b-secondary ease-in-out duration-150">
      <Icon id={id} className="mx-auto group-hover:stroke-secondary ease-in-out duration-150" />
    </button>)

}

function IconButtons({ iconIds }: { iconIds: string[] }) {
  return (
    <div className="flex justify-between items-center border-b space-x-4 mt-4">
      {iconIds?.map(iconId => <IconButton id={iconId} key={iconId} />)}
    </div>
  )
}

function ActionButtons() {
  return (
    <div className='flex'>
      <BaseButton text='PROFIL' classNames='text-xs border-r border-t hover:text-white hover:bg-secondary' />
      <BaseButton text='BOOK A VISIT' classNames='text-xs border-t hover:text-white hover:bg-secondary' />
    </div>
  )
}



function UserInfo({ name, specialisation, avatar }: UserType) {
  const generateAvatar = useMemo(() => {
    const COLOR_OPTIONS = [
      'bg-blue-300 text-blue-700',
      'bg-orange-300 text-orange-700',
      'bg-pink-300 text-pink-700',
      'bg-purple-300 text-purple-700',
      'bg-cyan-300 text-cyan-700',
    ]
    const randomIndex = Math.floor(Math.random() * COLOR_OPTIONS.length)

    return (
      <div className={`${COLOR_OPTIONS[randomIndex]} rounded-full w-20 h-20 font-bold text-xl flex justify-center items-center `}>
        {name?.split(" ").map(word => word[0]).join("")}
      </div>
    );
  }, [name]);
  return <div className="flex flex-col mx-auto items-center">
    {avatar ? <img src={`./${avatar}.png`} className='w-20 h-20' /> : generateAvatar}
    <p className="font-semibold mt-3">{name}</p>
    <p className="text-bluey-grey text-sm">{specialisation}</p>
  </div>
}
const getAverage = (num1: number, num2: number) => (
  (num1 / num2).toFixed(2)
)
function Card(props: DoctorType) {
  const [rating, setRating] = useState(0);
  const { numberOfReviews, sumOfReviews, ...userInfo } = props

  const dispatch = useAppDispatch()
  const favoriteDoctorsArray = useAppSelector((state) => state.favoriteDoctor.doctorsArray)
  const isInFavorite = favoriteDoctorsArray.some(obj => obj.ID === props.ID)

  const onClick = (doctorObject: DoctorType) => dispatch(
    isInFavorite ?
      removeDoctorFromFavorites(doctorObject) :
      addDoctorToFavorites(doctorObject)
  )

  const averageRating = rating > 0 ? getAverage(sumOfReviews + rating, numberOfReviews + 1) : getAverage(sumOfReviews, numberOfReviews)
  const ratingsCount = rating > 0 ? numberOfReviews + 1 : numberOfReviews

  return (
    <div className="rounded bg-white w-72 flex flex-col shadow-sm hover:border hover:border-secondary lg:hover:scale-105 hover:shadow-[0_3px_16px_0px_#d8dced] transition">
      <div className="flex justify-between pt-2 px-1">
        <button>
          <Icon id="ellipsis-horizontal" className="rounded hover:stroke-2 hover:stroke-secondary hover:bg-[#f3f5fc] transition" />
        </button>
        <button onClick={() => onClick(props)}>
          <Icon id="heart" className={`${isInFavorite ? 'fill-secondary stroke-secondary' : ''} transition hover:fill-secondary hover:stroke-secondary`} />
        </button>
      </div>
      <UserInfo {...userInfo} />
      <IconButtons iconIds={['bell', 'calendar', 'mail']} />
      <div className="flex">
        <Rating rating={rating} setRating={setRating} />
        <div className='flex flex-col justify-center items-center mx-auto'>
          <p className='text-2xl font-bold'>{averageRating}</p>
          <p className='text-xs text-bluey-grey'>({ratingsCount})</p>
        </div>
      </div>
      <ActionButtons />
    </div>)
}

export default Card