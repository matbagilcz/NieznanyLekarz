import { useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from 'react-virtualized-auto-sizer'

import Card, { DoctorType } from '../Card/Card';

type DataProps = {
  columnCount: number,
  itemCount: number,
  cardContent: DoctorType[],
  cardWidth: number,
  cardHeight: number,
  gapSize: number
}

type ItemProps = {
  index: number,
  style: React.CSSProperties
  data: DataProps
}

const GAP_SIZE = 20
const CARD_HEIGHT = 353
const CARD_WIDTH = 288

const Item = ({ data, index, style }: ItemProps) => {
  const { cardHeight, cardWidth, columnCount, gapSize, itemCount, cardContent } = data

  const startIndex = index * columnCount
  const stopIndex = Math.min(itemCount - 1, startIndex + columnCount - 1)

  const cards = []
  for (let i = startIndex; i <= stopIndex; i++) {
    cards.push(
      <div
        key={i}
        className="flex items-center "
        style={{
          flex: `0 0 ${cardWidth}px`,
          height: cardHeight,
          margin: `0 ${gapSize / 2}px`
        }}
      >
        <Card {...cardContent[i]} />
      </div>
    )
  }

  return (
    <div className="flex items-center lg:px-36 justify-center lg:justify-normal" style={style}>
      {cards}
    </div>
  )
}

type ListWrapperProps = {
  height: number,
  itemCount:number,
  width: number,
  cardContent: DoctorType[]
}

function ListWrapper({ height, itemCount, width, cardContent }: ListWrapperProps) {
  const columnCount = Math.floor((width - GAP_SIZE) / (CARD_WIDTH + GAP_SIZE))
  const rowCount = Math.ceil(itemCount / columnCount)

  const itemData = useMemo(
    () => ({
      columnCount,
      itemCount,
      cardContent,
      cardWidth: CARD_WIDTH,
      cardHeight: CARD_HEIGHT,
      gapSize: GAP_SIZE
    }),
    [columnCount, itemCount]
  )

  return (
    <List
      height={height}
      itemCount={rowCount}
      itemSize={CARD_HEIGHT + GAP_SIZE}
      width={width}
      itemData={itemData}
    >
      {Item}
    </List>
  )
}

type CardsGridProps = {
  cardContent: DoctorType[]
}

const CardsGrid = ({ cardContent }: CardsGridProps) =>
  cardContent?.length > 0 ? (
    <AutoSizer>
      {({ height, width }) => (
        <ListWrapper height={height} itemCount={cardContent.length} width={width} cardContent={cardContent} />
      )}
    </AutoSizer>
  ) : (<div className="flex justify-center">No doctors found.</div>)

export default CardsGrid