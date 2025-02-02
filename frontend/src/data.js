// Sample Articles Data (Mock)
const sampleArticles = [
    {
      slug: "future-of-ai",
      title: "The Future of AI in 2025",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "John Doe",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-01-10",
      content: ["Welcome! Today we're going to be talking about the fastest way to learn React. Lorem proin congue ligula id risus posuere, vel eleifend ex egestas. Sed in turpis leo. Aliquam malesuada in massa tincidunt egestas. Nam consectetur varius turpis, non porta arcu porttitor non. In tincidunt vulputate nulla quis egestas. Ut eleifend ut ipsum non fringilla. Praesent imperdiet nulla nec est luctus, at sodales purus euismod. Donec vel mauris lectus. Etiam nec lectus urna. Sed sodales ultrices dapibus. Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id consequat quam. Vivamus accumsan dui in facilisis aliquet. Etiam nec lectus urna. Sed sodales ultrices dapibus. Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id consequat quam. Vivamus accumsan dui in facilisis aliquet."]
    },
    {
      slug: "web3-revolution",
      title: "How Web3 is Changing the Internet",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "Alice Smith",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-01-05",
      content: ["Decentralized applications and blockchain technology are revolutionizing the web..."]
    },
    {
      slug: "quantum-computing",
      title: "Quantum Computing: A Game Changer",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "David Johnson",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-01-15",
      content: ["Quantum computing is set to disrupt cybersecurity, AI, and data processing..."]
    },
    {
      slug: "cloud-computing",
      title: "Exploring the Cloud Computing Era",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "Emma White",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-01-18",
      content: ["Cloud computing has revolutionized the way businesses and individuals store data..."]
    },
    {
      slug: "robotics-revolution",
      title: "The Rise of Robotics in Everyday Life",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "Chris Green",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-01-20",
      content: ["Robotics are transforming industries, from manufacturing to healthcare..."]
    },
    {
      slug: "blockchain-101",
      title: "Blockchain 101: What You Need to Know",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "Nina Brown",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-01-22",
      content: ["Blockchain technology has gained traction in recent years and is now being adopted across various industries..."]
    },
    {
      slug: "the-metaverse",
      title: "Exploring the Metaverse and Its Impact",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "James Black",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-01-25",
      content: ["The Metaverse is the next big thing in technology, enabling virtual worlds to interact with the real world..."]
    },
    {
      slug: "5g-network",
      title: "The Future of 5G Networks",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "Michael Grey",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-01-28",
      content: ["5G networks will bring faster internet speeds and low-latency communication to various applications..."]
    },
    {
      slug: "cybersecurity-trends",
      title: "Top Cybersecurity Trends in 2024",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "Rachel Blue",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-01-30",
      content: ["With the rise of digital technologies, cybersecurity has become more important than ever..."]
    },
    {
      slug: "ai-ethics",
      title: "AI Ethics: The Challenges We Face",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "Oliver Pink",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-02-01",
      content: ["As AI technologies advance, the ethical implications become more pressing..."]
    },
    {
      slug: "edge-computing",
      title: "The Power of Edge Computing",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "Sophia Grey",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-02-03",
      content: ["Edge computing allows data processing closer to where it is needed, reducing latency..."]
    },
    {
      slug: "autonomous-vehicles",
      title: "Autonomous Vehicles: The Road Ahead",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "David Lee",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-02-05",
      content: ["Self-driving cars are set to revolutionize transportation, but many challenges remain..."]
    },
    {
      slug: "virtual-reality",
      title: "Virtual Reality in Education",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "Elena White",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-02-07",
      content: ["Virtual reality is changing the way we learn, offering immersive experiences for education..."]
    },
    {
      slug: "3d-printing",
      title: "3D Printing: A Game Changer in Manufacturing",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "Liam Black",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-02-09",
      content: ["3D printing technology is reshaping industries by enabling faster and more cost-effective production..."]
    },
    {
      slug: "smart-cities",
      title: "Building the Smart Cities of Tomorrow",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "Ava Green",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-02-11",
      content: ["Smart cities are using technology to improve urban living, from transportation to energy management..."]
    },
    {
      slug: "future-of-education",
      title: "The Future of Education: Online Learning and Beyond",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "Matthew Blue",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-02-13",
      content: ["The education sector is evolving with the growth of online platforms and digital tools..."]
    },
    {
      slug: "tech-for-good",
      title: "Tech for Good: Leveraging Technology for Social Impact",
      thumbnail: "https://mymernbucket-amazona.s3.amazonaws.com/1715280659597.jpg",
      author: "Mia Pink",
      authorImage: "https://mymernbucket-amazona.s3.amazonaws.com/1716451982236.jpg",
      createdAt: "2024-02-15",
      content: ["Technology has the power to create a positive impact on society, from education to healthcare..."]
    }
  ];

  export default sampleArticles;