import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  getSerieById,
} from '../api/api'
import { useAuth } from '../context/AuthContext'

function SerieDetail() {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()


  const [serie, setSerie] = useState(null)


  const [rating, setRating] = useState('10')
  const [content, setContent] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [editRating, setEditRating] = useState('10')
  const [editContent, setEditContent] = useState('')

  async function loadSerieData() {
    try {
      setLoading(true)
      setError('')

      const serieData = await getSerieById(id)

      setSerie(serieData)
      
      if (isAuthenticated) {
        const myReviewData = await getMyReview(id)
        setMyReview(myReviewData)
      } else {
        setMyReview(null)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
}

export default SerieDetail