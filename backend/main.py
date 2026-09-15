from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, engine, Base
from models import QueueEntry
from time import time

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://192.168.1.38:3000",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


### Guest
@app.post("/join_queue")
def post_wait(name: str, people: int, db: Session = Depends(get_db)):
    entry = QueueEntry(
        name=name,
        people=people,
        time=time()
    )

    print("name = {name}, people = {people}")

    db.add(entry)
    db.commit()
    db.refresh(entry)

    return entry

@app.get("/guest")
def read_guest(id: int, db: Session = Depends(get_db)):
    guest = db.query(QueueEntry).filter(
        QueueEntry.id == id
    ).first()

    guest.position = db.query(QueueEntry).filter(
        QueueEntry.time < guest.time,
        QueueEntry.status == "waiting"
    ).count()

    return guest

@app.delete("/leave_queue")
def delete_leave(id: int, db: Session = Depends(get_db)):
    queue_entry = db.query(QueueEntry).filter(QueueEntry.id == id).first()
    if not queue_entry:
        raise HTTPException(
            status_code=404,
            detail="Queue entry not found"
        )

    db.delete(queue_entry)
    db.commit()

    return {"message": "Queue entry deleted"}



### Host

@app.delete("/call_guest")
def delete_enter(id: int, db: Session = Depends(get_db)):
    queue_entry = db.query(QueueEntry).filter(QueueEntry.id == id).first()
    if not queue_entry:
        raise HTTPException(
            status_code=404,
            detail="Queue entry not found"
        )

    db.delete(queue_entry)
    db.commit()

    return {"message": "Queue entry deleted"}


@app.get("/queue")
def read_root(db: Session = Depends(get_db)):
    return db.query(QueueEntry).all()
