import React, { useEffect } from 'react'
import {
    AdaptableCard,
    Loading,
    Container,
    DoubleSidedImage,
} from 'components/shared'
import CustomerProfile from './components/CustomerProfile'
import PaymentHistory from './components/PaymentHistory'
import CurrentSubscription from './components/CurrentSubscription'
import PaymentMethods from './components/PaymentMethods'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomer } from './store/dataSlice'
import reducer from './store'
import { injectReducer } from 'store/index'
import isEmpty from 'lodash/isEmpty'
import useQuery from 'utils/hooks/useQuery'

injectReducer('crmCustomerDetails', reducer)

const CustomerDetail = () => {
    const dispatch = useDispatch()

    const query = useQuery()

    const data = useSelector(
        (state) => state.crmCustomerDetails.data.profileData
    )

    const loading = useSelector(
        (state) => state.crmCustomerDetails.data.loading
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        const id = query.get('id')
        if (id) {
            dispatch(getCustomer({ id }))
        }
    }

    return (
        <Container className="h-full">
            <Loading loading={loading}>
                {!isEmpty(data) && (
                    <div className="flex flex-col xl:flex-row gap-4">
                        <div>
                            <CustomerProfile data={data} />
                        </div>
                        <div className="w-full">
                            <AdaptableCard>
                                <CurrentSubscription />
                                <PaymentHistory />
                                <PaymentMethods data={data.paymentMethod} />
                            </AdaptableCard>
                        </div>
                    </div>
                )}
            </Loading>
            {!loading && isEmpty(data) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No user found!"
                    />
                    <h3 className="mt-8">No user found!</h3>
                </div>
            )}
        </Container>
    )
}

export default CustomerDetail
