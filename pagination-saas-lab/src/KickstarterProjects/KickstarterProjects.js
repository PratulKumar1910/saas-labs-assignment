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
            <div className='footer-container'>
                <div className='footer-left'>
                <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage===1}
                >
                    {"<<"}
                </button>
                <button
                    className='.footer-btn'
                    onClick={() => setCurrentPage(currentPage-1)}
                    disabled={currentPage===1}
                >
                    Prev
                </button>
                </div>
                <div className='footer-center'>
                    Page <span className="current-page">{currentPage}</span> of {totalPages}
                </div>
                <div className='footer-right'>
                <button
                    className='.footer-btn'
                    onClick={() => setCurrentPage(currentPage+1)}
                    disabled={currentPage===totalPages-1}
                >
                    Next
                </button>
                <button
                    className='.footer-btn'
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