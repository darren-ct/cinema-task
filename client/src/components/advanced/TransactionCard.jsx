import StyledTransactionCard from '../../core-ui/TransactionCard.style'
import {getMonth} from "../../helpers/index"



const TransactionCard = ({transaction}) => {

     const day = transaction.day;
     const month = getMonth(transaction.month);
     const year = transaction.year;

     const time = day + " " +  month + "," + year;

     
  return (
      <StyledTransactionCard status={transaction.status}>
           <img className='transaction-img' src={transaction.movie.image} alt=''/>
           <div className='transaction-description'>
                <b>{transaction.movie.title}</b>
                <span className='time'>{time}</span>
                <p>Price: Rp.{transaction.movie.price}</p>
           </div>
           <div className='status'>{transaction.status}</div>
      </StyledTransactionCard>
  )
}

export default TransactionCard