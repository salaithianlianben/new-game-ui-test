import React from 'react'
import AnimatedSearchInput from '../../components/widgets/AnimatedSearchInput'

const GamesView = () => {
     const gameProviders = [
  {
    id: 1,
    name: 'JILI',
    value: 'jili',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/JILI_logo.png/200px-JILI_logo.png',
  },
  {
    id: 2,
    name: 'PG Soft',
    value: 'pg',
    logo: 'https://static.pgsoft.com/logo.png',
  },
  {
    id: 3,
    name: 'Pragmatic Play',
    value: 'pragmatic',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Pragmatic_Play_logo.svg/200px-Pragmatic_Play_logo.svg.png',
  },
  {
    id: 4,
    name: 'JDB',
    value: 'jdb',
    logo: 'https://jdb168.com/images/logo.png',
  },
  {
    id: 5,
    name: 'CQ9',
    value: 'cq9',
    logo: 'https://www.cq9.com.tw/images/logo.png',
  },
  {
    id: 6,
    name: 'Kingmaker',
    value: 'kingmaker',
    logo: 'https://www.kingmaker.games/images/logo.png',
  },
  {
    id: 7,
    name: 'Spadegaming',
    value: 'spadegaming',
    logo: 'https://spadegaming.com/assets/logo.png',
  },
  {
    id: 8,
    name: 'Red Tiger',
    value: 'redtiger',
    logo: 'https://redtiger.com/themes/custom/redtiger/logo.svg',
  },
  {
    id: 9,
    name: 'KA Gaming',
    value: 'ka',
    logo: 'https://www.kagaming.com/img/logo.png',
  },
  {
    id: 10,
    name: 'Yggdrasil',
    value: 'yggdrasil',
    logo: 'https://www.yggdrasilgaming.com/themes/custom/yggdrasil/logo.svg',
  },
];
 const games = [
  {
    id: 1,
    name: 'Dragon Gold 6888',
    gameImg: 'https://cdn.icon-icons.com/icons2/2107/PNG/512/game-controller-icon-130958.png',
  },
  {
    id: 2,
    name: 'Golden Treasure',
    gameImg: 'https://static.vecteezy.com/system/resources/previews/001/939/930/original/golden-treasure-chest-vector.jpg',
  },
  {
    id: 3,
    name: 'Mystic Forest',
    gameImg: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
  },
  {
    id: 4,
    name: 'Lucky Panda',
    gameImg: 'https://cdn-icons-png.flaticon.com/512/616/616432.png',
  },
  {
    id: 5,
    name: 'Fortune Wheel',
    gameImg: 'https://cdn-icons-png.flaticon.com/512/1067/1067090.png',
  },
  {
    id: 6,
    name: 'Treasure Hunt',
    gameImg: 'https://cdn-icons-png.flaticon.com/512/2629/2629569.png',
  },
];


  return (
    <div className='px-5 xl:px-20 py-5'>
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-10">
         <button
        className="flex items-center space-x-6 rounded-full sm:rounded-lg border-2 border-primary/60 px-3 sm:px-5 py-1.5 text-[13px] sm:text-sm font-bold text-white  bg-black transition-colors"
        type="button"
      >
         <span className='hover:text-primary/70 transition-all ease-in-out duration-150'>All Games</span>
         <span className='hover:text-primary/70 transition-all ease-in-out duration-150'>Popular Games</span>
         <span className='hover:text-primary/70 transition-all ease-in-out duration-150'>New Games</span>
      </button>
      <AnimatedSearchInput/>
      </div>
      <div className='my-6 cursor-pointer flex items-center gap-1.5 sm:gap-3 styled-scroll overflow-x-scroll'>
        {gameProviders.map((item)=>{
            return <div key={item.id}  className="flex items-center space-x-2 rounded-md border border-primary/20 bg-primary/5 px-3 sm:px-5 py-1 sm:py-1.5 text-[12px] sm:text-sm font-bold text-primary hover:bg-primary/10 transition-colors">
                 <p className='text-nowrap'>{item.name}</p>
            </div>
        })}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5">
        {[...games,...games,...games].map((item)=>{
            return <div className='' key={item.id}>
                <img src={"https://spm788bucket.s3.ap-southeast-1.amazonaws.com/games/Bingo.png"} className='w-full h-[100px] sm:h-[130px] rounded-lg' />
                <p className="text-center mt-1 text-sm">{item.name}</p>
            </div>
        })}
      </div>
       <button
        className="mt-10 flex mx-auto items-center space-x-2 rounded-md border border-primary/20 bg-black px-6 py-2.5 text-base font-bold text-primary hover:bg-primary/10 transition-colors"
        type="button"
      >
         <span>Load More</span>
      </button>
    </div>
  )
}

export default GamesView
