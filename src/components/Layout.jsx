import React,{Fragment} from 'react'
import { Header } from './Header'

const Layout = ({children}) => {
  return (
    <Fragment>
      <Header/>
        <div className='pt-16'>
          {
            children
          }
        </div>
    </Fragment>
  )
}

export default Layout