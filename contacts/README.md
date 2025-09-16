# Contact Management System

## Overview
Email contact management and outreach system for the Chinese Medicine Avatar project.

## Purpose
- Manage stakeholder contacts for demo scheduling
- Coordinate Bytewise outreach activities
- Track communication history
- Support demo and presentation coordination

## Contact Categories
- **Stakeholders**: Decision makers and project sponsors
- **Technical Team**: Development and implementation contacts  
- **Demo Participants**: People interested in avatar demonstrations
- **Partners**: Collaboration and integration contacts
- **Media/Press**: Outreach and publicity contacts

## Data Structure
```json
{
  "contacts": [
    {
      "id": "contact_001",
      "name": "Sample Contact",
      "email": "contact@example.com",
      "category": "stakeholder",
      "organization": "Company Name",
      "role": "Position Title",
      "interest_level": "high",
      "last_contact": "2025-09-15",
      "notes": "Interested in September demo",
      "demo_status": "scheduled"
    }
  ]
}
```

## Email Templates
### Demo Invitation
```
Subject: Chinese Medicine Avatar Demo - Interactive AI Healthcare Assistant

Dear [Name],

We're excited to invite you to a demonstration of our new Chinese Medicine Avatar project - an innovative AI-powered healthcare assistant that combines traditional Chinese medicine knowledge with cutting-edge avatar technology.

Demo Features:
- Interactive animated avatar conversations
- Real-time speech recognition and synthesis  
- Traditional Chinese medicine consultation simulation
- Multi-avatar conversation capabilities

Available demo options:
- Live demo session: [Date/Time]
- Video demonstration: [Link]
- Test environment access: http://8.211.158.223/

Please let us know your preferred option and availability.

Best regards,
[Your Name]
Chinese Medicine Avatar Team
```

### Follow-up Template
```
Subject: Follow-up: Chinese Medicine Avatar Demo

Dear [Name],

Thank you for your interest in the Chinese Medicine Avatar project. 

[Personalized follow-up content based on previous interaction]

Next steps:
- [Action items]
- [Timeline]
- [Contact information]

Best regards,
[Your Name]
```

## Integration Points
- Email sending service (SendGrid, Mailgun, etc.)
- CRM integration capabilities
- Demo scheduling system
- Analytics and tracking

## Files Structure
```
contacts/
├── contacts.json          # Contact database
├── email_templates/       # Email template files
├── outreach_log.md       # Communication history
└── demo_schedule.md      # Demo scheduling tracker
```

---
*Module: Contact Management*
*Status: Template Phase*