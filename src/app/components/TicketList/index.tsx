import classnames from 'classnames'
import TicketCounter from './TicketCounter'
import classes from './styles.module.css'
import Image from 'next/image'
import Link from 'next/link'

const genres: { [key in string]: string } = {
    comedy: 'Комедия',
    action: 'Боевик',
    horror: 'Ужасы',
    fantasy: 'Фэнтези',
}

type TicketListProps = {
    items: MovieType[]
}

type TicketListItemProps = {
    item: MovieType
}

TicketList.Item = function Item({ item }: TicketListItemProps) {
    return (
        <div key={item.id} className={classnames('paperBlock', classes.item)}>
            <div className={classes.itemLeft}>
                <Image
                    alt="poster"
                    width={100}
                    height={120}
                    src={item.posterUrl}
                    className={classes.itemPoster}
                />
                <div>
                    <Link
                        href={`/movie/${item.id}`}
                        className={classes.itemTitle}
                    >
                        {item.title}
                    </Link>
                    <div className={classes.itemGenre}>
                        {genres[item.genre]}
                    </div>
                </div>
            </div>
            <div className={classes.itemRight}>
                <TicketCounter movieId={item.id} />
            </div>
        </div>
    )
}

function TicketList({ items }: TicketListProps) {
    return (
        <div className={classes.list}>
            {items.map((item) => (
                <TicketList.Item key={item.id} item={item} />
            ))}
        </div>
    )
}

export default TicketList
