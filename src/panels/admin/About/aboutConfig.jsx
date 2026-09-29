import {
  createAchievement,
  createLeader,
  createPillar,
  createTeamMember,
  deleteAchievement,
  deleteLeader,
  deletePillar,
  deleteTeamMember,
  patchAchievement,
  patchLeader,
  patchPillar,
  patchTeamMember,
  updateAchievement,
  updateLeader,
  updatePillar,
  updateTeamMember,
} from "../../../lib/aboutApi";

/**
 * Everything the four repeating About page collections (achievements,
 * leadership, pillars, team) have in common, so `ItemsTab` can drive all of
 * them from a single generic implementation.
 */
export const COLLECTIONS = [
  {
    key: "achievements",
    label: "Achievements",
    singular: "achievement",
    blurb:
      "The stat cards under “Our Achievements”. Keep the value short — it is rendered large.",
    api: {
      create: createAchievement,
      update: updateAchievement,
      patch: patchAchievement,
      remove: deleteAchievement,
    },
    primary: (item) => item.value,
    secondary: (item) => item.label,
    columns: [
      { key: "value", label: "Value" },
      {
        key: "label",
        label: "Label",
        render: (item) => <span className="text-gray-500">{item.label}</span>,
      },
    ],
    fields: [
      {
        name: "value",
        label: "Value",
        type: "text",
        required: true,
        placeholder: "10+",
        help: "Shown in large accent text, e.g. 10+, 50,000+, 300+.",
      },
      {
        name: "label",
        label: "Label",
        type: "text",
        required: true,
        placeholder: "Years of HR & Recruitment Excellence",
      },
    ],
  },
  {
    key: "leadership",
    label: "Leadership",
    singular: "leader",
    blurb:
      "The alternating photo + message blocks. The first letter is used in “Message from our …”.",
    api: {
      create: createLeader,
      update: updateLeader,
      patch: patchLeader,
      remove: deleteLeader,
    },
    primary: (item) => item.name,
    secondary: (item) => item.role,
    columns: [
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      {
        name: "message",
        label: "Message",
        type: "richtext",
        placeholder: "Write the leader's message...",
      },
      {
        name: "image",
        label: "Portrait",
        type: "image",
        help: "Displayed large. A landscape image works best.",
      },
    ],
  },
  {
    key: "pillars",
    label: "Mission & Vision",
    singular: "pillar",
    blurb: "Mission, Vision, Opportunities and Why-us blocks, in the order you arrange them.",
    api: {
      create: createPillar,
      update: updatePillar,
      patch: patchPillar,
      remove: deletePillar,
    },
    primary: (item) => item.title,
    secondary: () => null,
    columns: [{ key: "title", label: "Title" }],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "description",
        label: "Description",
        type: "richtext",
        placeholder: "What this pillar covers...",
      },
      { name: "image", label: "Image", type: "image" },
    ],
  },
  {
    key: "team",
    label: "Team",
    singular: "team member",
    blurb: "Cards in the “Our Team” grid. Members without a photo fall back to a placeholder.",
    api: {
      create: createTeamMember,
      update: updateTeamMember,
      patch: patchTeamMember,
      remove: deleteTeamMember,
    },
    primary: (item) => item.name,
    secondary: (item) => item.role,
    columns: [
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      { name: "bio", label: "Bio", type: "richtext" },
      { name: "image", label: "Photo", type: "image" },
    ],
  },
];

/** Copy for the singleton About page row, grouped the way the public page reads. */
export const GENERAL_SECTIONS = [
  {
    title: "Hero",
    blurb: "The first thing visitors read at the top of the page.",
    fields: [
      { name: "hero_title", label: "Headline", type: "text" },
      {
        name: "hero_title_highlight",
        label: "Highlighted line",
        type: "text",
        help: "Rendered underneath the headline in the accent colour.",
      },
      {
        name: "hero_subtitle",
        label: "Subtitle",
        type: "textarea",
        rows: 2,
      },
    ],
  },
  {
    title: "Company introduction",
    toggle: "show_intro",
    fields: [
      {
        name: "intro_paragraphs",
        label: "Introduction",
        type: "richtext",
        help: "Leave each paragraph on its own line.",
      },
    ],
  },
  {
    title: "Our commitment",
    toggle: "show_commitment",
    fields: [
      { name: "commitment_title", label: "Title", type: "text" },
      { name: "commitment_text", label: "Text", type: "textarea" },
    ],
  },
  {
    title: "Achievements",
    toggle: "show_achievements",
    fields: [
      { name: "achievements_title", label: "Heading", type: "text" },
      {
        name: "achievements_paragraphs",
        label: "Paragraphs",
        type: "richtext",
        help: "Shown under the stat cards.",
      },
    ],
  },
  {
    title: "Leadership",
    toggle: "show_leadership",
    fields: [
      { name: "leadership_title", label: "Heading", type: "text" },
      { name: "leadership_subtitle", label: "Subheading", type: "textarea", rows: 2 },
    ],
  },
  {
    title: "Mission & Vision",
    toggle: "show_pillars",
    fields: [
      {
        name: "pillars_title",
        label: "Heading",
        type: "text",
        help: "Leave blank to hide the heading — the original page has none.",
      },
    ],
  },
  {
    title: "Team",
    toggle: "show_team",
    fields: [{ name: "team_title", label: "Heading", type: "text" }],
  },
];
