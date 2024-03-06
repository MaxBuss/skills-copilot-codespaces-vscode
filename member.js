function skillsMember() {
  return {
    name: 'skillsMember',
    type: 'skills',
    member: true,
    path: 'member',
    component: () => import('@/views/skills/member'),
    meta: {
      title: 'skillsMember',
      icon: 'user',
      noCache: true
    }
  }
}