import { createContext, useEffect, useState } from 'react'
import axios from "axios"
import DeviceInfo from 'react-native-device-info'
import { ToastAndroid } from 'react-native'
import { REACT_APP_BASE_URL } from "@env"

export const AppStore = createContext()

const AppContext = ({ children }) => {
    const [isLogin, setIsLogin] = useState(() => false)
    const [userId, setUserId] = useState(() => '')
    const [agentName, setAgentName] = useState(() => "")
    const [agentEmail, setAgentEmail] = useState(() => "")
    const [agentPhoneNumber, setAgentPhoneNumber] = useState(() => "")
    const [bankId, setBankId] = useState(() => "")
    const [bankName, setBankName] = useState(() => "")
    const [branchName, setBranchName] = useState(() => "")
    const [branchCode, setBranchCode] = useState(() => "")
    const [deviceId, setDeviceID] = useState(() => DeviceInfo.getUniqueIdSync())
    const [passcode, setPasscode] = useState(() => '')
    const [totalCollection, setTotalCollection] = useState(() => 0)
    const [receiptNumber, setReceiptNumber] = useState(() => 0)
    const [holidayLock, setHolidayLock] = useState(() => 0)
    const [maximumAmount, setMaximumAmount] = useState(() => 0)

    const [modifiedAt, setModifiedAt] = useState(() => new Date())
    const [todayDateFromServer, setTodayDateFromServer] = useState(() => new Date())

    const [next, setNext] = useState(() => false)

    useEffect(() => {
        const uniqueId = DeviceInfo.getUniqueIdSync()
        setDeviceID(uniqueId)
        console.log("UniqueID: ", uniqueId)
        console.log("DeviceID: ", deviceId)
        console.log("==========||||||| fdjgh")
    }, [])


    const login = async () => {
        const obj = {
            device_id: deviceId, user_id: userId, password: passcode
        }
        await axios.post(`${REACT_APP_BASE_URL}/user/login`, obj, {
            headers: {
                Accept: 'application/json',
            }
        }).then(res => {
            setIsLogin(true)
            console.log("response from server")
            console.log(res.data, res.status)
            setAgentName(res.data.success.user_data.msg[0].agent_name)
            setAgentEmail(res.data.success.user_data.msg[0].email_id)
            setAgentPhoneNumber(res.data.success.user_data.msg[0].phone_no)
            setBankId(res.data.success.user_data.msg[0].bank_id)
            setBankName(res.data.success.user_data.msg[0].bank_name)
            setBranchName(res.data.success.user_data.msg[0].branch_name)
            setBranchCode(res.data.success.user_data.msg[0].branch_code)
            setMaximumAmount(res.data.success.user_data.msg[0].max_amt)

            setTotalCollection(res.data.success.total_collection.msg[0].total_collection)

            setReceiptNumber(res.data.success.setting.msg[0].receipt_no)
            setModifiedAt(new Date(res.data.success.setting.msg[0].modified_at))
            setHolidayLock(res.data.success.setting.msg[0].holiday_lock)
        }).catch(err => {
            setIsLogin(false)
            setPasscode('')
            ToastAndroid.showWithGravityAndOffset(
                'Invalid Credentials',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                25,
                50,
            )
            console.error("Error:", err.response)
        })
    }

    console.log(modifiedAt.toISOString().slice(0, 10), modifiedAt)

    const nowDate = async () => {
        await axios.get(`${REACT_APP_BASE_URL}/user/now_date`).then(res => {
            console.log("NOW DATE FROM SERVER: ", new Date(res.data.now_date))
            setTodayDateFromServer(new Date(res.data.now_date))
        }).catch(err => {
            ToastAndroid.showWithGravityAndOffset(
                'Error fetching TIME',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                25,
                50,
            )
            console.error("Error: TTTTIIIMMMEEEEE", err.response.data)
        })
    }

    useEffect(() => {
        nowDate()
    }, [])


    const getUserId = async () => {
        const obj = { device_id: deviceId }

        await axios.post(`${REACT_APP_BASE_URL}/user/my_agent`, obj, {
            headers: {
                Accept: 'application/json',
            }
        }).then(res => {
            console.log("User ID: ", res.data.success.msg[0].user_id)
            setUserId(res.data.success.msg[0].user_id)
        }).catch(err => {
            ToastAndroid.showWithGravityAndOffset(
                'Error fetching details',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                25,
                50,
            )
            console.error("Error: ==========", err.response.data)
        })
    }

    const logout = () => {
        setIsLogin(false)
        setPasscode('')
    }

    return (
        <AppStore.Provider value={{ isLogin, setIsLogin, logout, userId, agentName, agentEmail, agentPhoneNumber, login, getUserId, deviceId, setDeviceID, passcode, setPasscode, next, setNext, bankId, bankName, branchName, branchCode, maximumAmount, totalCollection, receiptNumber, holidayLock, modifiedAt, todayDateFromServer }}>
            {children}
        </AppStore.Provider>
    )
}

export default AppContext