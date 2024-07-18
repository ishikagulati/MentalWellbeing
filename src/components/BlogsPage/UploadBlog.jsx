import React, { useState } from 'react'
import classes from "../../pages/BlogsPage/BlogsPage.module.css";
import Navbar from '../Navbar/Navbar'
import ReactQuill from 'react-quill';
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline } from "react-icons/io5";
import { formatISO9075, formatISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

const UploadBlog = ({ }) => {
    const [BlogDetails, setBlogDetails] = useState({
        title: '',
        img: null,
        upvotes: 0,
        category: '',
        content: '',
        author: localStorage.getItem('name'),
        timestamp:''
    });

    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = ['Mental Health', 'Wellness', 'Self-Care', 'Inspiration', 'Personal Story', 'Physical Health', 'other'];
    const [uploadedFile, setUploadedFile] = useState(null);
    const navigate = useNavigate();

    function handleUserInputChange(e) {
        if (e && e.target) {
            const { name, value } = e.target;
            setBlogDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value,
            }));
        } else {
            setBlogDetails((prevDetails) => ({
                ...prevDetails,
                content: e,
            }));
        }
    }

    const handleCategoryChange = (event) => {
        const newCategory = event.target.value;
        setSelectedCategory(newCategory);
        setBlogDetails((prevDetails) => ({
            ...prevDetails,
            category: newCategory,
        }));
    };

    const handleDrop = (acceptedFiles) => {
        // Handle the dropped files
        const file = acceptedFiles[0];
        setUploadedFile(file);
        setBlogDetails((prevDetails) => ({
            ...prevDetails,
            img: file,
        }));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
    });

    const saveDetails = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', BlogDetails.title);
        formData.append('content', BlogDetails.content);
        formData.append('file', uploadedFile);
        formData.append('category', BlogDetails.category);
        formData.append('author', BlogDetails.author);
        formData.append('timestamp', formatISO9075(new Date()))
    
        fetch("http://localhost:8080/blog/post",{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Allow-cross-origin-access": "true"    
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => console.log('File uploaded successfully:', data))
        .catch(error => console.error('Error uploading file:', error));
        alert('posted successfully')
        navigate("/blogs")
    }

    return (
        <div>
            <Navbar />
            <div className={classes.UploadPageContainer}>
                <h1>Post a Blog!</h1>
                <p>Welcome to the Blog Submission page! We're excited to hear your thoughts and insights on mental health. Your contribution can make a positive impact on our community.</p>
                <h2 id={classes.guideheading}>Submission Guidlines</h2>
                <ol>
                    <li><span>Content: </span>Your blog should focus on mental health-related topics, such as personal experiences, coping strategies, or advice. Avoid sharing sensitive personal information.</li>
                    <li><span>Positive and Supportive: </span>We encourage a positive and supportive tone. Share stories that inspire, motivate, or provide valuable insights.</li>
                    <li><span>No Medical Advice: </span>Please refrain from offering medical advice. Consult a mental health professional for specific guidance.</li>
                    <li><span>Original Content: </span>Submit only original content that has not been published elsewhere.</li>
                    <li><span>Images: </span>You can include images to complement your blog post. Ensure they are relevant and respectful. Avoid explicit or triggering content.</li>
                </ol>

                <div className='quesheading'>
                    <span>Every Story Matters, Every Voice Resonates</span>
                    <p>Together, We Illuminate the Path to Healing.</p>
                </div>

                {/* Form to write a blog */}

                <form onSubmit={saveDetails}>
                    <div className={classes.Blogques}>
                        <h2>What will be the title of your blog?</h2>
                        <input value={BlogDetails.title} onChange={handleUserInputChange} type="text" name='title' placeholder='Enter a compelling title for your blog post.' required />
                    </div>

                    <div className={classes.Blogques}>
                        <h2>Upload an image to capture readers' attention</h2>
                        <p>Note: this image will be displayed on the card on the MindWell's Blog Page</p>
                        <div {...getRootProps()} className={classes.FileUpload}>
                            <input {...getInputProps()} />
                            {uploadedFile ? (
                                <div>
                                    <p>File uploaded successfully!</p>
                                    <img
                                        src={URL.createObjectURL(uploadedFile)}
                                        alt="Uploaded"
                                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                                    />
                                    <p>File name: {uploadedFile.name}</p>
                                </div>
                            ) : isDragActive ? (
                                <p>Drop the image here...</p>
                            ) : (
                                <>
                                    <div><IoCloudUploadOutline size={60} /></div>
                                    <p>Drag & drop to upload,<br /> <span>or browse</span></p>

                                </>
                            )}
                        </div>
                    </div>

                    <div className={classes.Blogques}>
                        <h2>Which Category this blog belongs to?</h2>
                        <select value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="" disabled>Select a category</option>
                            {categories.map((category) => (
                                <option className={classes.categoryOptions} key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={classes.Blogques}>
                        <h2>Write Your Blog!</h2>
                        <ReactQuill className={classes.BlogContent} value={BlogDetails.content}
                            modules={modules}
                            formats={formats}
                            name='content'
                            onChange={handleUserInputChange}
                            placeholder='Write your blog post in the provided text editor.'
                        />
                    </div>

                    <div className={classes.publishBlogbtn}>
                        <button type='submit'>Publish</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadBlog