import React, { useState, useEffect } from 'react'
import './TaskTable.css'

export const KickstarterProjects = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5

    useEffect(() => {
        fetch(
            "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        )
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setProjects(data)
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false))
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    const totalPages = Math.ceil(projects.length / recordsPerPage)
    const paginatedProjectsList = projects.slice(
        (currentPage -1 ) * recordsPerPage, currentPage * recordsPerPage
    )

    return (
        <div className='task-table' >
            <div className='task-header'>
                <div className='task-cell'>S. No</div>
                <div className='task-cell'>Amount Pledged</div>
                <div className='task-cell'>Percentage Funded</div>
            </div>
            {paginatedProjectsList.map((project, ind) => {
                return (
                    <div
                        key={ind} className='task-row'>
                        <div className='task-cell'>
                        {project["s.no"].toLocaleString()}
                        </div>
                        <div className='task-cell'>
                            ${project["amt.pledged"].toLocaleString()}
                        </div>
                        <div className='task-cell'>
                            {project["percentage.funded"].toLocaleString()}
                        </div>
                    </div>
                )
            })}
            <div
                style={{
                    display: 'flex',
                    margin: '8px',
                    justifyContent: 'space-around'
                }}
            >
                <div>
                <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage===1}
                >
                    {"<<"}
                </button>
                <button
                    onClick={() => setCurrentPage(currentPage-1)}
                    disabled={currentPage===1}
                >
                    Prev
                </button>
                </div>
                <div
                    style={{
                        border: '1px solid grey',
                        padding: '6px 18px'
                    }}
                >
                    {currentPage}
                </div>
                <div>
                <button
                    onClick={() => setCurrentPage(currentPage+1)}
                    disabled={currentPage===totalPages-1}
                >
                    Next
                </button>
                <button
                    onClick={() => setCurrentPage(totalPages-1)}
                    disabled={currentPage===totalPages-1}
                >
                    {">>"}
                </button>
                </div>
            </div>
        </div>
    ) 
}