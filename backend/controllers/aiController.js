const axios = require("axios");

exports.getRecommendation = async (req, res) => {
  try {
    const { employee } = req.body;

    const prompt = `
    Analyze this employee:

    Name: ${employee.name}
    Department: ${employee.department}
    Skills: ${employee.skills}
    Performance Score: ${employee.performanceScore}
    Experience: ${employee.experience}

    Give:
    1. Promotion Recommendation
    2. Training Suggestions
    3. Performance Feedback
    4. Employee Ranking
    `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      recommendation:
        response.data.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "AI Error",
    });
  }
};